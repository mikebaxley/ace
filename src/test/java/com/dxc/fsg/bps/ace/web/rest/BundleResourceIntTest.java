package com.dxc.fsg.bps.ace.web.rest;

import com.dxc.fsg.bps.ace.AceApp;

import com.dxc.fsg.bps.ace.domain.Bundle;
import com.dxc.fsg.bps.ace.repository.BundleRepository;
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
 * Test class for the BundleResource REST controller.
 *
 * @see BundleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AceApp.class)
public class BundleResourceIntTest {

    private static final String DEFAULT_BUNDLE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_BUNDLE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_BUNDLE_KEY = "AAAAAAAAAA";
    private static final String UPDATED_BUNDLE_KEY = "BBBBBBBBBB";

    private static final String DEFAULT_AWD_SOURCE_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_AWD_SOURCE_TYPE = "BBBBBBBBBB";

    @Autowired
    private BundleRepository bundleRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBundleMockMvc;

    private Bundle bundle;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BundleResource bundleResource = new BundleResource(bundleRepository);
        this.restBundleMockMvc = MockMvcBuilders.standaloneSetup(bundleResource)
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
    public static Bundle createEntity(EntityManager em) {
        Bundle bundle = new Bundle()
            .bundleName(DEFAULT_BUNDLE_NAME)
            .bundleKey(DEFAULT_BUNDLE_KEY)
            .awdSourceType(DEFAULT_AWD_SOURCE_TYPE);
        return bundle;
    }

    @Before
    public void initTest() {
        bundle = createEntity(em);
    }

    @Test
    @Transactional
    public void createBundle() throws Exception {
        int databaseSizeBeforeCreate = bundleRepository.findAll().size();

        // Create the Bundle
        restBundleMockMvc.perform(post("/api/bundles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bundle)))
            .andExpect(status().isCreated());

        // Validate the Bundle in the database
        List<Bundle> bundleList = bundleRepository.findAll();
        assertThat(bundleList).hasSize(databaseSizeBeforeCreate + 1);
        Bundle testBundle = bundleList.get(bundleList.size() - 1);
        assertThat(testBundle.getBundleName()).isEqualTo(DEFAULT_BUNDLE_NAME);
        assertThat(testBundle.getBundleKey()).isEqualTo(DEFAULT_BUNDLE_KEY);
        assertThat(testBundle.getAwdSourceType()).isEqualTo(DEFAULT_AWD_SOURCE_TYPE);
    }

    @Test
    @Transactional
    public void createBundleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bundleRepository.findAll().size();

        // Create the Bundle with an existing ID
        bundle.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBundleMockMvc.perform(post("/api/bundles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bundle)))
            .andExpect(status().isBadRequest());

        // Validate the Bundle in the database
        List<Bundle> bundleList = bundleRepository.findAll();
        assertThat(bundleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBundles() throws Exception {
        // Initialize the database
        bundleRepository.saveAndFlush(bundle);

        // Get all the bundleList
        restBundleMockMvc.perform(get("/api/bundles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bundle.getId().intValue())))
            .andExpect(jsonPath("$.[*].bundleName").value(hasItem(DEFAULT_BUNDLE_NAME.toString())))
            .andExpect(jsonPath("$.[*].bundleKey").value(hasItem(DEFAULT_BUNDLE_KEY.toString())))
            .andExpect(jsonPath("$.[*].awdSourceType").value(hasItem(DEFAULT_AWD_SOURCE_TYPE.toString())));
    }

    @Test
    @Transactional
    public void getBundle() throws Exception {
        // Initialize the database
        bundleRepository.saveAndFlush(bundle);

        // Get the bundle
        restBundleMockMvc.perform(get("/api/bundles/{id}", bundle.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bundle.getId().intValue()))
            .andExpect(jsonPath("$.bundleName").value(DEFAULT_BUNDLE_NAME.toString()))
            .andExpect(jsonPath("$.bundleKey").value(DEFAULT_BUNDLE_KEY.toString()))
            .andExpect(jsonPath("$.awdSourceType").value(DEFAULT_AWD_SOURCE_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBundle() throws Exception {
        // Get the bundle
        restBundleMockMvc.perform(get("/api/bundles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBundle() throws Exception {
        // Initialize the database
        bundleRepository.saveAndFlush(bundle);
        int databaseSizeBeforeUpdate = bundleRepository.findAll().size();

        // Update the bundle
        Bundle updatedBundle = bundleRepository.findOne(bundle.getId());
        // Disconnect from session so that the updates on updatedBundle are not directly saved in db
        em.detach(updatedBundle);
        updatedBundle
            .bundleName(UPDATED_BUNDLE_NAME)
            .bundleKey(UPDATED_BUNDLE_KEY)
            .awdSourceType(UPDATED_AWD_SOURCE_TYPE);

        restBundleMockMvc.perform(put("/api/bundles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBundle)))
            .andExpect(status().isOk());

        // Validate the Bundle in the database
        List<Bundle> bundleList = bundleRepository.findAll();
        assertThat(bundleList).hasSize(databaseSizeBeforeUpdate);
        Bundle testBundle = bundleList.get(bundleList.size() - 1);
        assertThat(testBundle.getBundleName()).isEqualTo(UPDATED_BUNDLE_NAME);
        assertThat(testBundle.getBundleKey()).isEqualTo(UPDATED_BUNDLE_KEY);
        assertThat(testBundle.getAwdSourceType()).isEqualTo(UPDATED_AWD_SOURCE_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingBundle() throws Exception {
        int databaseSizeBeforeUpdate = bundleRepository.findAll().size();

        // Create the Bundle

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBundleMockMvc.perform(put("/api/bundles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bundle)))
            .andExpect(status().isCreated());

        // Validate the Bundle in the database
        List<Bundle> bundleList = bundleRepository.findAll();
        assertThat(bundleList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBundle() throws Exception {
        // Initialize the database
        bundleRepository.saveAndFlush(bundle);
        int databaseSizeBeforeDelete = bundleRepository.findAll().size();

        // Get the bundle
        restBundleMockMvc.perform(delete("/api/bundles/{id}", bundle.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Bundle> bundleList = bundleRepository.findAll();
        assertThat(bundleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Bundle.class);
        Bundle bundle1 = new Bundle();
        bundle1.setId(1L);
        Bundle bundle2 = new Bundle();
        bundle2.setId(bundle1.getId());
        assertThat(bundle1).isEqualTo(bundle2);
        bundle2.setId(2L);
        assertThat(bundle1).isNotEqualTo(bundle2);
        bundle1.setId(null);
        assertThat(bundle1).isNotEqualTo(bundle2);
    }
}
