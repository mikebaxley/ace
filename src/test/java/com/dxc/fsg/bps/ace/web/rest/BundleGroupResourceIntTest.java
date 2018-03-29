package com.dxc.fsg.bps.ace.web.rest;

import com.dxc.fsg.bps.ace.AceApp;

import com.dxc.fsg.bps.ace.domain.BundleGroup;
import com.dxc.fsg.bps.ace.repository.BundleGroupRepository;
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
 * Test class for the BundleGroupResource REST controller.
 *
 * @see BundleGroupResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AceApp.class)
public class BundleGroupResourceIntTest {

    private static final String DEFAULT_BUNDLE_GROUP_NAME = "AAAAAAAAAA";
    private static final String UPDATED_BUNDLE_GROUP_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_BUNDLE_GROUP_KEY = "AAAAAAAAAA";
    private static final String UPDATED_BUNDLE_GROUP_KEY = "BBBBBBBBBB";

    @Autowired
    private BundleGroupRepository bundleGroupRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBundleGroupMockMvc;

    private BundleGroup bundleGroup;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BundleGroupResource bundleGroupResource = new BundleGroupResource(bundleGroupRepository);
        this.restBundleGroupMockMvc = MockMvcBuilders.standaloneSetup(bundleGroupResource)
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
    public static BundleGroup createEntity(EntityManager em) {
        BundleGroup bundleGroup = new BundleGroup()
            .bundleGroupName(DEFAULT_BUNDLE_GROUP_NAME)
            .bundleGroupKey(DEFAULT_BUNDLE_GROUP_KEY);
        return bundleGroup;
    }

    @Before
    public void initTest() {
        bundleGroup = createEntity(em);
    }

    @Test
    @Transactional
    public void createBundleGroup() throws Exception {
        int databaseSizeBeforeCreate = bundleGroupRepository.findAll().size();

        // Create the BundleGroup
        restBundleGroupMockMvc.perform(post("/api/bundle-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bundleGroup)))
            .andExpect(status().isCreated());

        // Validate the BundleGroup in the database
        List<BundleGroup> bundleGroupList = bundleGroupRepository.findAll();
        assertThat(bundleGroupList).hasSize(databaseSizeBeforeCreate + 1);
        BundleGroup testBundleGroup = bundleGroupList.get(bundleGroupList.size() - 1);
        assertThat(testBundleGroup.getBundleGroupName()).isEqualTo(DEFAULT_BUNDLE_GROUP_NAME);
        assertThat(testBundleGroup.getBundleGroupKey()).isEqualTo(DEFAULT_BUNDLE_GROUP_KEY);
    }

    @Test
    @Transactional
    public void createBundleGroupWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bundleGroupRepository.findAll().size();

        // Create the BundleGroup with an existing ID
        bundleGroup.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBundleGroupMockMvc.perform(post("/api/bundle-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bundleGroup)))
            .andExpect(status().isBadRequest());

        // Validate the BundleGroup in the database
        List<BundleGroup> bundleGroupList = bundleGroupRepository.findAll();
        assertThat(bundleGroupList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBundleGroups() throws Exception {
        // Initialize the database
        bundleGroupRepository.saveAndFlush(bundleGroup);

        // Get all the bundleGroupList
        restBundleGroupMockMvc.perform(get("/api/bundle-groups?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bundleGroup.getId().intValue())))
            .andExpect(jsonPath("$.[*].bundleGroupName").value(hasItem(DEFAULT_BUNDLE_GROUP_NAME.toString())))
            .andExpect(jsonPath("$.[*].bundleGroupKey").value(hasItem(DEFAULT_BUNDLE_GROUP_KEY.toString())));
    }

    @Test
    @Transactional
    public void getBundleGroup() throws Exception {
        // Initialize the database
        bundleGroupRepository.saveAndFlush(bundleGroup);

        // Get the bundleGroup
        restBundleGroupMockMvc.perform(get("/api/bundle-groups/{id}", bundleGroup.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bundleGroup.getId().intValue()))
            .andExpect(jsonPath("$.bundleGroupName").value(DEFAULT_BUNDLE_GROUP_NAME.toString()))
            .andExpect(jsonPath("$.bundleGroupKey").value(DEFAULT_BUNDLE_GROUP_KEY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBundleGroup() throws Exception {
        // Get the bundleGroup
        restBundleGroupMockMvc.perform(get("/api/bundle-groups/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBundleGroup() throws Exception {
        // Initialize the database
        bundleGroupRepository.saveAndFlush(bundleGroup);
        int databaseSizeBeforeUpdate = bundleGroupRepository.findAll().size();

        // Update the bundleGroup
        BundleGroup updatedBundleGroup = bundleGroupRepository.findOne(bundleGroup.getId());
        // Disconnect from session so that the updates on updatedBundleGroup are not directly saved in db
        em.detach(updatedBundleGroup);
        updatedBundleGroup
            .bundleGroupName(UPDATED_BUNDLE_GROUP_NAME)
            .bundleGroupKey(UPDATED_BUNDLE_GROUP_KEY);

        restBundleGroupMockMvc.perform(put("/api/bundle-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBundleGroup)))
            .andExpect(status().isOk());

        // Validate the BundleGroup in the database
        List<BundleGroup> bundleGroupList = bundleGroupRepository.findAll();
        assertThat(bundleGroupList).hasSize(databaseSizeBeforeUpdate);
        BundleGroup testBundleGroup = bundleGroupList.get(bundleGroupList.size() - 1);
        assertThat(testBundleGroup.getBundleGroupName()).isEqualTo(UPDATED_BUNDLE_GROUP_NAME);
        assertThat(testBundleGroup.getBundleGroupKey()).isEqualTo(UPDATED_BUNDLE_GROUP_KEY);
    }

    @Test
    @Transactional
    public void updateNonExistingBundleGroup() throws Exception {
        int databaseSizeBeforeUpdate = bundleGroupRepository.findAll().size();

        // Create the BundleGroup

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBundleGroupMockMvc.perform(put("/api/bundle-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bundleGroup)))
            .andExpect(status().isCreated());

        // Validate the BundleGroup in the database
        List<BundleGroup> bundleGroupList = bundleGroupRepository.findAll();
        assertThat(bundleGroupList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBundleGroup() throws Exception {
        // Initialize the database
        bundleGroupRepository.saveAndFlush(bundleGroup);
        int databaseSizeBeforeDelete = bundleGroupRepository.findAll().size();

        // Get the bundleGroup
        restBundleGroupMockMvc.perform(delete("/api/bundle-groups/{id}", bundleGroup.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BundleGroup> bundleGroupList = bundleGroupRepository.findAll();
        assertThat(bundleGroupList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BundleGroup.class);
        BundleGroup bundleGroup1 = new BundleGroup();
        bundleGroup1.setId(1L);
        BundleGroup bundleGroup2 = new BundleGroup();
        bundleGroup2.setId(bundleGroup1.getId());
        assertThat(bundleGroup1).isEqualTo(bundleGroup2);
        bundleGroup2.setId(2L);
        assertThat(bundleGroup1).isNotEqualTo(bundleGroup2);
        bundleGroup1.setId(null);
        assertThat(bundleGroup1).isNotEqualTo(bundleGroup2);
    }
}
