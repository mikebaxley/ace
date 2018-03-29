package com.dxc.fsg.bps.ace.web.rest;

import com.dxc.fsg.bps.ace.AceApp;

import com.dxc.fsg.bps.ace.domain.BundleToDocument;
import com.dxc.fsg.bps.ace.repository.BundleToDocumentRepository;
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
 * Test class for the BundleToDocumentResource REST controller.
 *
 * @see BundleToDocumentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AceApp.class)
public class BundleToDocumentResourceIntTest {

    private static final Integer DEFAULT_COLLATE_SEQUENCE = 1;
    private static final Integer UPDATED_COLLATE_SEQUENCE = 2;

    private static final Boolean DEFAULT_OPTIONAL = false;
    private static final Boolean UPDATED_OPTIONAL = true;

    @Autowired
    private BundleToDocumentRepository bundleToDocumentRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBundleToDocumentMockMvc;

    private BundleToDocument bundleToDocument;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BundleToDocumentResource bundleToDocumentResource = new BundleToDocumentResource(bundleToDocumentRepository);
        this.restBundleToDocumentMockMvc = MockMvcBuilders.standaloneSetup(bundleToDocumentResource)
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
    public static BundleToDocument createEntity(EntityManager em) {
        BundleToDocument bundleToDocument = new BundleToDocument()
            .collateSequence(DEFAULT_COLLATE_SEQUENCE)
            .optional(DEFAULT_OPTIONAL);
        return bundleToDocument;
    }

    @Before
    public void initTest() {
        bundleToDocument = createEntity(em);
    }

    @Test
    @Transactional
    public void createBundleToDocument() throws Exception {
        int databaseSizeBeforeCreate = bundleToDocumentRepository.findAll().size();

        // Create the BundleToDocument
        restBundleToDocumentMockMvc.perform(post("/api/bundle-to-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bundleToDocument)))
            .andExpect(status().isCreated());

        // Validate the BundleToDocument in the database
        List<BundleToDocument> bundleToDocumentList = bundleToDocumentRepository.findAll();
        assertThat(bundleToDocumentList).hasSize(databaseSizeBeforeCreate + 1);
        BundleToDocument testBundleToDocument = bundleToDocumentList.get(bundleToDocumentList.size() - 1);
        assertThat(testBundleToDocument.getCollateSequence()).isEqualTo(DEFAULT_COLLATE_SEQUENCE);
        assertThat(testBundleToDocument.isOptional()).isEqualTo(DEFAULT_OPTIONAL);
    }

    @Test
    @Transactional
    public void createBundleToDocumentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bundleToDocumentRepository.findAll().size();

        // Create the BundleToDocument with an existing ID
        bundleToDocument.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBundleToDocumentMockMvc.perform(post("/api/bundle-to-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bundleToDocument)))
            .andExpect(status().isBadRequest());

        // Validate the BundleToDocument in the database
        List<BundleToDocument> bundleToDocumentList = bundleToDocumentRepository.findAll();
        assertThat(bundleToDocumentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBundleToDocuments() throws Exception {
        // Initialize the database
        bundleToDocumentRepository.saveAndFlush(bundleToDocument);

        // Get all the bundleToDocumentList
        restBundleToDocumentMockMvc.perform(get("/api/bundle-to-documents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bundleToDocument.getId().intValue())))
            .andExpect(jsonPath("$.[*].collateSequence").value(hasItem(DEFAULT_COLLATE_SEQUENCE)))
            .andExpect(jsonPath("$.[*].optional").value(hasItem(DEFAULT_OPTIONAL.booleanValue())));
    }

    @Test
    @Transactional
    public void getBundleToDocument() throws Exception {
        // Initialize the database
        bundleToDocumentRepository.saveAndFlush(bundleToDocument);

        // Get the bundleToDocument
        restBundleToDocumentMockMvc.perform(get("/api/bundle-to-documents/{id}", bundleToDocument.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bundleToDocument.getId().intValue()))
            .andExpect(jsonPath("$.collateSequence").value(DEFAULT_COLLATE_SEQUENCE))
            .andExpect(jsonPath("$.optional").value(DEFAULT_OPTIONAL.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingBundleToDocument() throws Exception {
        // Get the bundleToDocument
        restBundleToDocumentMockMvc.perform(get("/api/bundle-to-documents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBundleToDocument() throws Exception {
        // Initialize the database
        bundleToDocumentRepository.saveAndFlush(bundleToDocument);
        int databaseSizeBeforeUpdate = bundleToDocumentRepository.findAll().size();

        // Update the bundleToDocument
        BundleToDocument updatedBundleToDocument = bundleToDocumentRepository.findOne(bundleToDocument.getId());
        // Disconnect from session so that the updates on updatedBundleToDocument are not directly saved in db
        em.detach(updatedBundleToDocument);
        updatedBundleToDocument
            .collateSequence(UPDATED_COLLATE_SEQUENCE)
            .optional(UPDATED_OPTIONAL);

        restBundleToDocumentMockMvc.perform(put("/api/bundle-to-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBundleToDocument)))
            .andExpect(status().isOk());

        // Validate the BundleToDocument in the database
        List<BundleToDocument> bundleToDocumentList = bundleToDocumentRepository.findAll();
        assertThat(bundleToDocumentList).hasSize(databaseSizeBeforeUpdate);
        BundleToDocument testBundleToDocument = bundleToDocumentList.get(bundleToDocumentList.size() - 1);
        assertThat(testBundleToDocument.getCollateSequence()).isEqualTo(UPDATED_COLLATE_SEQUENCE);
        assertThat(testBundleToDocument.isOptional()).isEqualTo(UPDATED_OPTIONAL);
    }

    @Test
    @Transactional
    public void updateNonExistingBundleToDocument() throws Exception {
        int databaseSizeBeforeUpdate = bundleToDocumentRepository.findAll().size();

        // Create the BundleToDocument

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBundleToDocumentMockMvc.perform(put("/api/bundle-to-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bundleToDocument)))
            .andExpect(status().isCreated());

        // Validate the BundleToDocument in the database
        List<BundleToDocument> bundleToDocumentList = bundleToDocumentRepository.findAll();
        assertThat(bundleToDocumentList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBundleToDocument() throws Exception {
        // Initialize the database
        bundleToDocumentRepository.saveAndFlush(bundleToDocument);
        int databaseSizeBeforeDelete = bundleToDocumentRepository.findAll().size();

        // Get the bundleToDocument
        restBundleToDocumentMockMvc.perform(delete("/api/bundle-to-documents/{id}", bundleToDocument.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BundleToDocument> bundleToDocumentList = bundleToDocumentRepository.findAll();
        assertThat(bundleToDocumentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BundleToDocument.class);
        BundleToDocument bundleToDocument1 = new BundleToDocument();
        bundleToDocument1.setId(1L);
        BundleToDocument bundleToDocument2 = new BundleToDocument();
        bundleToDocument2.setId(bundleToDocument1.getId());
        assertThat(bundleToDocument1).isEqualTo(bundleToDocument2);
        bundleToDocument2.setId(2L);
        assertThat(bundleToDocument1).isNotEqualTo(bundleToDocument2);
        bundleToDocument1.setId(null);
        assertThat(bundleToDocument1).isNotEqualTo(bundleToDocument2);
    }
}
