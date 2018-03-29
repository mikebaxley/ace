package com.dxc.fsg.bps.ace.web.rest;

import com.dxc.fsg.bps.ace.AceApp;

import com.dxc.fsg.bps.ace.domain.DocumentSpecific;
import com.dxc.fsg.bps.ace.repository.DocumentSpecificRepository;
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
 * Test class for the DocumentSpecificResource REST controller.
 *
 * @see DocumentSpecificResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AceApp.class)
public class DocumentSpecificResourceIntTest {

    private static final String DEFAULT_FILE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FILE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_FILE_PATH = "AAAAAAAAAA";
    private static final String UPDATED_FILE_PATH = "BBBBBBBBBB";

    @Autowired
    private DocumentSpecificRepository documentSpecificRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDocumentSpecificMockMvc;

    private DocumentSpecific documentSpecific;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DocumentSpecificResource documentSpecificResource = new DocumentSpecificResource(documentSpecificRepository);
        this.restDocumentSpecificMockMvc = MockMvcBuilders.standaloneSetup(documentSpecificResource)
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
    public static DocumentSpecific createEntity(EntityManager em) {
        DocumentSpecific documentSpecific = new DocumentSpecific()
            .fileName(DEFAULT_FILE_NAME)
            .filePath(DEFAULT_FILE_PATH);
        return documentSpecific;
    }

    @Before
    public void initTest() {
        documentSpecific = createEntity(em);
    }

    @Test
    @Transactional
    public void createDocumentSpecific() throws Exception {
        int databaseSizeBeforeCreate = documentSpecificRepository.findAll().size();

        // Create the DocumentSpecific
        restDocumentSpecificMockMvc.perform(post("/api/document-specifics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentSpecific)))
            .andExpect(status().isCreated());

        // Validate the DocumentSpecific in the database
        List<DocumentSpecific> documentSpecificList = documentSpecificRepository.findAll();
        assertThat(documentSpecificList).hasSize(databaseSizeBeforeCreate + 1);
        DocumentSpecific testDocumentSpecific = documentSpecificList.get(documentSpecificList.size() - 1);
        assertThat(testDocumentSpecific.getFileName()).isEqualTo(DEFAULT_FILE_NAME);
        assertThat(testDocumentSpecific.getFilePath()).isEqualTo(DEFAULT_FILE_PATH);
    }

    @Test
    @Transactional
    public void createDocumentSpecificWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = documentSpecificRepository.findAll().size();

        // Create the DocumentSpecific with an existing ID
        documentSpecific.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDocumentSpecificMockMvc.perform(post("/api/document-specifics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentSpecific)))
            .andExpect(status().isBadRequest());

        // Validate the DocumentSpecific in the database
        List<DocumentSpecific> documentSpecificList = documentSpecificRepository.findAll();
        assertThat(documentSpecificList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDocumentSpecifics() throws Exception {
        // Initialize the database
        documentSpecificRepository.saveAndFlush(documentSpecific);

        // Get all the documentSpecificList
        restDocumentSpecificMockMvc.perform(get("/api/document-specifics?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(documentSpecific.getId().intValue())))
            .andExpect(jsonPath("$.[*].fileName").value(hasItem(DEFAULT_FILE_NAME.toString())))
            .andExpect(jsonPath("$.[*].filePath").value(hasItem(DEFAULT_FILE_PATH.toString())));
    }

    @Test
    @Transactional
    public void getDocumentSpecific() throws Exception {
        // Initialize the database
        documentSpecificRepository.saveAndFlush(documentSpecific);

        // Get the documentSpecific
        restDocumentSpecificMockMvc.perform(get("/api/document-specifics/{id}", documentSpecific.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(documentSpecific.getId().intValue()))
            .andExpect(jsonPath("$.fileName").value(DEFAULT_FILE_NAME.toString()))
            .andExpect(jsonPath("$.filePath").value(DEFAULT_FILE_PATH.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDocumentSpecific() throws Exception {
        // Get the documentSpecific
        restDocumentSpecificMockMvc.perform(get("/api/document-specifics/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDocumentSpecific() throws Exception {
        // Initialize the database
        documentSpecificRepository.saveAndFlush(documentSpecific);
        int databaseSizeBeforeUpdate = documentSpecificRepository.findAll().size();

        // Update the documentSpecific
        DocumentSpecific updatedDocumentSpecific = documentSpecificRepository.findOne(documentSpecific.getId());
        // Disconnect from session so that the updates on updatedDocumentSpecific are not directly saved in db
        em.detach(updatedDocumentSpecific);
        updatedDocumentSpecific
            .fileName(UPDATED_FILE_NAME)
            .filePath(UPDATED_FILE_PATH);

        restDocumentSpecificMockMvc.perform(put("/api/document-specifics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDocumentSpecific)))
            .andExpect(status().isOk());

        // Validate the DocumentSpecific in the database
        List<DocumentSpecific> documentSpecificList = documentSpecificRepository.findAll();
        assertThat(documentSpecificList).hasSize(databaseSizeBeforeUpdate);
        DocumentSpecific testDocumentSpecific = documentSpecificList.get(documentSpecificList.size() - 1);
        assertThat(testDocumentSpecific.getFileName()).isEqualTo(UPDATED_FILE_NAME);
        assertThat(testDocumentSpecific.getFilePath()).isEqualTo(UPDATED_FILE_PATH);
    }

    @Test
    @Transactional
    public void updateNonExistingDocumentSpecific() throws Exception {
        int databaseSizeBeforeUpdate = documentSpecificRepository.findAll().size();

        // Create the DocumentSpecific

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDocumentSpecificMockMvc.perform(put("/api/document-specifics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentSpecific)))
            .andExpect(status().isCreated());

        // Validate the DocumentSpecific in the database
        List<DocumentSpecific> documentSpecificList = documentSpecificRepository.findAll();
        assertThat(documentSpecificList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDocumentSpecific() throws Exception {
        // Initialize the database
        documentSpecificRepository.saveAndFlush(documentSpecific);
        int databaseSizeBeforeDelete = documentSpecificRepository.findAll().size();

        // Get the documentSpecific
        restDocumentSpecificMockMvc.perform(delete("/api/document-specifics/{id}", documentSpecific.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DocumentSpecific> documentSpecificList = documentSpecificRepository.findAll();
        assertThat(documentSpecificList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DocumentSpecific.class);
        DocumentSpecific documentSpecific1 = new DocumentSpecific();
        documentSpecific1.setId(1L);
        DocumentSpecific documentSpecific2 = new DocumentSpecific();
        documentSpecific2.setId(documentSpecific1.getId());
        assertThat(documentSpecific1).isEqualTo(documentSpecific2);
        documentSpecific2.setId(2L);
        assertThat(documentSpecific1).isNotEqualTo(documentSpecific2);
        documentSpecific1.setId(null);
        assertThat(documentSpecific1).isNotEqualTo(documentSpecific2);
    }
}
