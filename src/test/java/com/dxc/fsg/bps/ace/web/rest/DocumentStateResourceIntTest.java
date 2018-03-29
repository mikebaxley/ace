package com.dxc.fsg.bps.ace.web.rest;

import com.dxc.fsg.bps.ace.AceApp;

import com.dxc.fsg.bps.ace.domain.DocumentState;
import com.dxc.fsg.bps.ace.repository.DocumentStateRepository;
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
 * Test class for the DocumentStateResource REST controller.
 *
 * @see DocumentStateResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AceApp.class)
public class DocumentStateResourceIntTest {

    private static final String DEFAULT_STATE = "AA";
    private static final String UPDATED_STATE = "BB";

    @Autowired
    private DocumentStateRepository documentStateRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDocumentStateMockMvc;

    private DocumentState documentState;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DocumentStateResource documentStateResource = new DocumentStateResource(documentStateRepository);
        this.restDocumentStateMockMvc = MockMvcBuilders.standaloneSetup(documentStateResource)
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
    public static DocumentState createEntity(EntityManager em) {
        DocumentState documentState = new DocumentState()
            .state(DEFAULT_STATE);
        return documentState;
    }

    @Before
    public void initTest() {
        documentState = createEntity(em);
    }

    @Test
    @Transactional
    public void createDocumentState() throws Exception {
        int databaseSizeBeforeCreate = documentStateRepository.findAll().size();

        // Create the DocumentState
        restDocumentStateMockMvc.perform(post("/api/document-states")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentState)))
            .andExpect(status().isCreated());

        // Validate the DocumentState in the database
        List<DocumentState> documentStateList = documentStateRepository.findAll();
        assertThat(documentStateList).hasSize(databaseSizeBeforeCreate + 1);
        DocumentState testDocumentState = documentStateList.get(documentStateList.size() - 1);
        assertThat(testDocumentState.getState()).isEqualTo(DEFAULT_STATE);
    }

    @Test
    @Transactional
    public void createDocumentStateWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = documentStateRepository.findAll().size();

        // Create the DocumentState with an existing ID
        documentState.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDocumentStateMockMvc.perform(post("/api/document-states")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentState)))
            .andExpect(status().isBadRequest());

        // Validate the DocumentState in the database
        List<DocumentState> documentStateList = documentStateRepository.findAll();
        assertThat(documentStateList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkStateIsRequired() throws Exception {
        int databaseSizeBeforeTest = documentStateRepository.findAll().size();
        // set the field null
        documentState.setState(null);

        // Create the DocumentState, which fails.

        restDocumentStateMockMvc.perform(post("/api/document-states")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentState)))
            .andExpect(status().isBadRequest());

        List<DocumentState> documentStateList = documentStateRepository.findAll();
        assertThat(documentStateList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDocumentStates() throws Exception {
        // Initialize the database
        documentStateRepository.saveAndFlush(documentState);

        // Get all the documentStateList
        restDocumentStateMockMvc.perform(get("/api/document-states?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(documentState.getId().intValue())))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.toString())));
    }

    @Test
    @Transactional
    public void getDocumentState() throws Exception {
        // Initialize the database
        documentStateRepository.saveAndFlush(documentState);

        // Get the documentState
        restDocumentStateMockMvc.perform(get("/api/document-states/{id}", documentState.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(documentState.getId().intValue()))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDocumentState() throws Exception {
        // Get the documentState
        restDocumentStateMockMvc.perform(get("/api/document-states/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDocumentState() throws Exception {
        // Initialize the database
        documentStateRepository.saveAndFlush(documentState);
        int databaseSizeBeforeUpdate = documentStateRepository.findAll().size();

        // Update the documentState
        DocumentState updatedDocumentState = documentStateRepository.findOne(documentState.getId());
        // Disconnect from session so that the updates on updatedDocumentState are not directly saved in db
        em.detach(updatedDocumentState);
        updatedDocumentState
            .state(UPDATED_STATE);

        restDocumentStateMockMvc.perform(put("/api/document-states")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDocumentState)))
            .andExpect(status().isOk());

        // Validate the DocumentState in the database
        List<DocumentState> documentStateList = documentStateRepository.findAll();
        assertThat(documentStateList).hasSize(databaseSizeBeforeUpdate);
        DocumentState testDocumentState = documentStateList.get(documentStateList.size() - 1);
        assertThat(testDocumentState.getState()).isEqualTo(UPDATED_STATE);
    }

    @Test
    @Transactional
    public void updateNonExistingDocumentState() throws Exception {
        int databaseSizeBeforeUpdate = documentStateRepository.findAll().size();

        // Create the DocumentState

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDocumentStateMockMvc.perform(put("/api/document-states")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentState)))
            .andExpect(status().isCreated());

        // Validate the DocumentState in the database
        List<DocumentState> documentStateList = documentStateRepository.findAll();
        assertThat(documentStateList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDocumentState() throws Exception {
        // Initialize the database
        documentStateRepository.saveAndFlush(documentState);
        int databaseSizeBeforeDelete = documentStateRepository.findAll().size();

        // Get the documentState
        restDocumentStateMockMvc.perform(delete("/api/document-states/{id}", documentState.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DocumentState> documentStateList = documentStateRepository.findAll();
        assertThat(documentStateList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DocumentState.class);
        DocumentState documentState1 = new DocumentState();
        documentState1.setId(1L);
        DocumentState documentState2 = new DocumentState();
        documentState2.setId(documentState1.getId());
        assertThat(documentState1).isEqualTo(documentState2);
        documentState2.setId(2L);
        assertThat(documentState1).isNotEqualTo(documentState2);
        documentState1.setId(null);
        assertThat(documentState1).isNotEqualTo(documentState2);
    }
}
