package com.dxc.fsg.bps.ace.web.rest;

import com.dxc.fsg.bps.ace.AceApp;

import com.dxc.fsg.bps.ace.domain.Launch;
import com.dxc.fsg.bps.ace.repository.LaunchRepository;
import com.dxc.fsg.bps.ace.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.dxc.fsg.bps.ace.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the LaunchResource REST controller.
 *
 * @see LaunchResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AceApp.class)
public class LaunchResourceIntTest {

    private static final String DEFAULT_LAUNCH_APP = "AAAAAAAAAA";
    private static final String UPDATED_LAUNCH_APP = "BBBBBBBBBB";

    private static final String DEFAULT_LAUNCH_KEY = "AAAAAAAAAA";
    private static final String UPDATED_LAUNCH_KEY = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ENABLED = false;
    private static final Boolean UPDATED_ENABLED = true;

    @Autowired
    private LaunchRepository launchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restLaunchMockMvc;

    private Launch launch;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LaunchResource launchResource = new LaunchResource(launchRepository);
        this.restLaunchMockMvc = MockMvcBuilders.standaloneSetup(launchResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Launch createEntity(EntityManager em) {
        Launch launch = new Launch()
            .launchApp(DEFAULT_LAUNCH_APP)
            .launchKey(DEFAULT_LAUNCH_KEY)
            .enabled(DEFAULT_ENABLED);
        return launch;
    }

    @Before
    public void initTest() {
        launch = createEntity(em);
    }

    @Test
    @Transactional
    public void createLaunch() throws Exception {
        int databaseSizeBeforeCreate = launchRepository.findAll().size();

        // Create the Launch
        restLaunchMockMvc.perform(post("/api/launches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(launch)))
            .andExpect(status().isCreated());

        // Validate the Launch in the database
        List<Launch> launchList = launchRepository.findAll();
        assertThat(launchList).hasSize(databaseSizeBeforeCreate + 1);
        Launch testLaunch = launchList.get(launchList.size() - 1);
        assertThat(testLaunch.getLaunchApp()).isEqualTo(DEFAULT_LAUNCH_APP);
        assertThat(testLaunch.getLaunchKey()).isEqualTo(DEFAULT_LAUNCH_KEY);
        assertThat(testLaunch.isEnabled()).isEqualTo(DEFAULT_ENABLED);
    }

    @Test
    @Transactional
    public void createLaunchWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = launchRepository.findAll().size();

        // Create the Launch with an existing ID
        launch.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLaunchMockMvc.perform(post("/api/launches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(launch)))
            .andExpect(status().isBadRequest());

        // Validate the Launch in the database
        List<Launch> launchList = launchRepository.findAll();
        assertThat(launchList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllLaunches() throws Exception {
        // Initialize the database
        launchRepository.saveAndFlush(launch);

        // Get all the launchList
        restLaunchMockMvc.perform(get("/api/launches?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(launch.getId().intValue())))
            .andExpect(jsonPath("$.[*].launchApp").value(hasItem(DEFAULT_LAUNCH_APP.toString())))
            .andExpect(jsonPath("$.[*].launchKey").value(hasItem(DEFAULT_LAUNCH_KEY.toString())))
            .andExpect(jsonPath("$.[*].enabled").value(hasItem(DEFAULT_ENABLED.booleanValue())));
    }

    @Test
    @Transactional
    public void getLaunch() throws Exception {
        // Initialize the database
        launchRepository.saveAndFlush(launch);

        // Get the launch
        restLaunchMockMvc.perform(get("/api/launches/{id}", launch.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(launch.getId().intValue()))
            .andExpect(jsonPath("$.launchApp").value(DEFAULT_LAUNCH_APP.toString()))
            .andExpect(jsonPath("$.launchKey").value(DEFAULT_LAUNCH_KEY.toString()))
            .andExpect(jsonPath("$.enabled").value(DEFAULT_ENABLED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingLaunch() throws Exception {
        // Get the launch
        restLaunchMockMvc.perform(get("/api/launches/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLaunch() throws Exception {
        // Initialize the database
        launchRepository.saveAndFlush(launch);
        int databaseSizeBeforeUpdate = launchRepository.findAll().size();

        // Update the launch
        Launch updatedLaunch = launchRepository.findOne(launch.getId());
        // Disconnect from session so that the updates on updatedLaunch are not directly saved in db
        em.detach(updatedLaunch);
        updatedLaunch
            .launchApp(UPDATED_LAUNCH_APP)
            .launchKey(UPDATED_LAUNCH_KEY)
            .enabled(UPDATED_ENABLED);

        restLaunchMockMvc.perform(put("/api/launches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLaunch)))
            .andExpect(status().isOk());

        // Validate the Launch in the database
        List<Launch> launchList = launchRepository.findAll();
        assertThat(launchList).hasSize(databaseSizeBeforeUpdate);
        Launch testLaunch = launchList.get(launchList.size() - 1);
        assertThat(testLaunch.getLaunchApp()).isEqualTo(UPDATED_LAUNCH_APP);
        assertThat(testLaunch.getLaunchKey()).isEqualTo(UPDATED_LAUNCH_KEY);
        assertThat(testLaunch.isEnabled()).isEqualTo(UPDATED_ENABLED);
    }

    @Test
    @Transactional
    public void updateNonExistingLaunch() throws Exception {
        int databaseSizeBeforeUpdate = launchRepository.findAll().size();

        // Create the Launch

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restLaunchMockMvc.perform(put("/api/launches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(launch)))
            .andExpect(status().isCreated());

        // Validate the Launch in the database
        List<Launch> launchList = launchRepository.findAll();
        assertThat(launchList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteLaunch() throws Exception {
        // Initialize the database
        launchRepository.saveAndFlush(launch);
        int databaseSizeBeforeDelete = launchRepository.findAll().size();

        // Get the launch
        restLaunchMockMvc.perform(delete("/api/launches/{id}", launch.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Launch> launchList = launchRepository.findAll();
        assertThat(launchList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Launch.class);
        Launch launch1 = new Launch();
        launch1.setId(1L);
        Launch launch2 = new Launch();
        launch2.setId(launch1.getId());
        assertThat(launch1).isEqualTo(launch2);
        launch2.setId(2L);
        assertThat(launch1).isNotEqualTo(launch2);
        launch1.setId(null);
        assertThat(launch1).isNotEqualTo(launch2);
    }
}
