package com.dxc.fsg.bps.ace.web.rest;

import com.dxc.fsg.bps.ace.AceApp;

import com.dxc.fsg.bps.ace.domain.DocumentGeneric;
import com.dxc.fsg.bps.ace.repository.DocumentGenericRepository;
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
 * Test class for the DocumentGenericResource REST controller.
 *
 * @see DocumentGenericResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AceApp.class)
public class DocumentGenericResourceIntTest {

    private static final String DEFAULT_DOCUMENT_KEY = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENT_KEY = "BBBBBBBBBB";

    private static final String DEFAULT_MATCH_ISSUE_OR_RESIDENT_STATE = "AAAAAAAAAA";
    private static final String UPDATED_MATCH_ISSUE_OR_RESIDENT_STATE = "BBBBBBBBBB";

    @Autowired
    private DocumentGenericRepository documentGenericRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDocumentGenericMockMvc;

    private DocumentGeneric documentGeneric;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DocumentGenericResource documentGenericResource = new DocumentGenericResource(documentGenericRepository);
        this.restDocumentGenericMockMvc = MockMvcBuilders.standaloneSetup(documentGenericResource)
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
    public static DocumentGeneric createEntity(EntityManager em) {
        DocumentGeneric documentGeneric = new DocumentGeneric()
            .documentKey(DEFAULT_DOCUMENT_KEY)
            .matchIssueOrResidentState(DEFAULT_MATCH_ISSUE_OR_RESIDENT_STATE);
        return documentGeneric;
    }

    @Before
    public void initTest() {
        documentGeneric = createEntity(em);
    }

    @Test
    @Transactional
    public void createDocumentGeneric() throws Exception {
        int databaseSizeBeforeCreate = documentGenericRepository.findAll().size();

        // Create the DocumentGeneric
        restDocumentGenericMockMvc.perform(post("/api/document-generics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentGeneric)))
            .andExpect(status().isCreated());

        // Validate the DocumentGeneric in the database
        List<DocumentGeneric> documentGenericList = documentGenericRepository.findAll();
        assertThat(documentGenericList).hasSize(databaseSizeBeforeCreate + 1);
        DocumentGeneric testDocumentGeneric = documentGenericList.get(documentGenericList.size() - 1);
        assertThat(testDocumentGeneric.getDocumentKey()).isEqualTo(DEFAULT_DOCUMENT_KEY);
        assertThat(testDocumentGeneric.getMatchIssueOrResidentState()).isEqualTo(DEFAULT_MATCH_ISSUE_OR_RESIDENT_STATE);
    }

    @Test
    @Transactional
    public void createDocumentGenericWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = documentGenericRepository.findAll().size();

        // Create the DocumentGeneric with an existing ID
        documentGeneric.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDocumentGenericMockMvc.perform(post("/api/document-generics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentGeneric)))
            .andExpect(status().isBadRequest());

        // Validate the DocumentGeneric in the database
        List<DocumentGeneric> documentGenericList = documentGenericRepository.findAll();
        assertThat(documentGenericList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDocumentGenerics() throws Exception {
        // Initialize the database
        documentGenericRepository.saveAndFlush(documentGeneric);

        // Get all the documentGenericList
        restDocumentGenericMockMvc.perform(get("/api/document-generics?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(documentGeneric.getId().intValue())))
            .andExpect(jsonPath("$.[*].documentKey").value(hasItem(DEFAULT_DOCUMENT_KEY.toString())))
            .andExpect(jsonPath("$.[*].matchIssueOrResidentState").value(hasItem(DEFAULT_MATCH_ISSUE_OR_RESIDENT_STATE.toString())));
    }

    @Test
    @Transactional
    public void getDocumentGeneric() throws Exception {
        // Initialize the database
        documentGenericRepository.saveAndFlush(documentGeneric);

        // Get the documentGeneric
        restDocumentGenericMockMvc.perform(get("/api/document-generics/{id}", documentGeneric.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(documentGeneric.getId().intValue()))
            .andExpect(jsonPath("$.documentKey").value(DEFAULT_DOCUMENT_KEY.toString()))
            .andExpect(jsonPath("$.matchIssueOrResidentState").value(DEFAULT_MATCH_ISSUE_OR_RESIDENT_STATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDocumentGeneric() throws Exception {
        // Get the documentGeneric
        restDocumentGenericMockMvc.perform(get("/api/document-generics/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDocumentGeneric() throws Exception {
        // Initialize the database
        documentGenericRepository.saveAndFlush(documentGeneric);
        int databaseSizeBeforeUpdate = documentGenericRepository.findAll().size();

        // Update the documentGeneric
        DocumentGeneric updatedDocumentGeneric = documentGenericRepository.findOne(documentGeneric.getId());
        // Disconnect from session so that the updates on updatedDocumentGeneric are not directly saved in db
        em.detach(updatedDocumentGeneric);
        updatedDocumentGeneric
            .documentKey(UPDATED_DOCUMENT_KEY)
            .matchIssueOrResidentState(UPDATED_MATCH_ISSUE_OR_RESIDENT_STATE);

        restDocumentGenericMockMvc.perform(put("/api/document-generics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDocumentGeneric)))
            .andExpect(status().isOk());

        // Validate the DocumentGeneric in the database
        List<DocumentGeneric> documentGenericList = documentGenericRepository.findAll();
        assertThat(documentGenericList).hasSize(databaseSizeBeforeUpdate);
        DocumentGeneric testDocumentGeneric = documentGenericList.get(documentGenericList.size() - 1);
        assertThat(testDocumentGeneric.getDocumentKey()).isEqualTo(UPDATED_DOCUMENT_KEY);
        assertThat(testDocumentGeneric.getMatchIssueOrResidentState()).isEqualTo(UPDATED_MATCH_ISSUE_OR_RESIDENT_STATE);
    }

    @Test
    @Transactional
    public void updateNonExistingDocumentGeneric() throws Exception {
        int databaseSizeBeforeUpdate = documentGenericRepository.findAll().size();

        // Create the DocumentGeneric

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDocumentGenericMockMvc.perform(put("/api/document-generics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentGeneric)))
            .andExpect(status().isCreated());

        // Validate the DocumentGeneric in the database
        List<DocumentGeneric> documentGenericList = documentGenericRepository.findAll();
        assertThat(documentGenericList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDocumentGeneric() throws Exception {
        // Initialize the database
        documentGenericRepository.saveAndFlush(documentGeneric);
        int databaseSizeBeforeDelete = documentGenericRepository.findAll().size();

        // Get the documentGeneric
        restDocumentGenericMockMvc.perform(delete("/api/document-generics/{id}", documentGeneric.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DocumentGeneric> documentGenericList = documentGenericRepository.findAll();
        assertThat(documentGenericList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DocumentGeneric.class);
        DocumentGeneric documentGeneric1 = new DocumentGeneric();
        documentGeneric1.setId(1L);
        DocumentGeneric documentGeneric2 = new DocumentGeneric();
        documentGeneric2.setId(documentGeneric1.getId());
        assertThat(documentGeneric1).isEqualTo(documentGeneric2);
        documentGeneric2.setId(2L);
        assertThat(documentGeneric1).isNotEqualTo(documentGeneric2);
        documentGeneric1.setId(null);
        assertThat(documentGeneric1).isNotEqualTo(documentGeneric2);
    }
}
