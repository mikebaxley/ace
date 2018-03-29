package com.dxc.fsg.bps.ace.web.rest;

import com.dxc.fsg.bps.ace.AceApp;

import com.dxc.fsg.bps.ace.domain.PrintManagement;
import com.dxc.fsg.bps.ace.repository.PrintManagementRepository;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.dxc.fsg.bps.ace.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PrintManagementResource REST controller.
 *
 * @see PrintManagementResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AceApp.class)
public class PrintManagementResourceIntTest {

    private static final String DEFAULT_PRINTER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PRINTER_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_WHEN_DOCUMENT_CREATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_WHEN_DOCUMENT_CREATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_FROM_SERVER = "AAAAAAAAAA";
    private static final String UPDATED_FROM_SERVER = "BBBBBBBBBB";

    private static final String DEFAULT_DOCUMENT_FILE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENT_FILE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DOCUMENT_FULL_PATH = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENT_FULL_PATH = "BBBBBBBBBB";

    private static final String DEFAULT_DOCUMENT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENT_STATUS = "BBBBBBBBBB";

    private static final Integer DEFAULT_TRY_COUNT = 1;
    private static final Integer UPDATED_TRY_COUNT = 2;

    private static final Instant DEFAULT_WHEN_PROCESSED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_WHEN_PROCESSED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_PROCESSING_DURATION = 1;
    private static final Integer UPDATED_PROCESSING_DURATION = 2;

    private static final String DEFAULT_PROCESSING_INFO = "AAAAAAAAAA";
    private static final String UPDATED_PROCESSING_INFO = "BBBBBBBBBB";

    private static final String DEFAULT_EXTRA_FIELD = "AAAAAAAAAA";
    private static final String UPDATED_EXTRA_FIELD = "BBBBBBBBBB";

    @Autowired
    private PrintManagementRepository printManagementRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPrintManagementMockMvc;

    private PrintManagement printManagement;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PrintManagementResource printManagementResource = new PrintManagementResource(printManagementRepository);
        this.restPrintManagementMockMvc = MockMvcBuilders.standaloneSetup(printManagementResource)
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
    public static PrintManagement createEntity(EntityManager em) {
        PrintManagement printManagement = new PrintManagement()
            .printerName(DEFAULT_PRINTER_NAME)
            .whenDocumentCreated(DEFAULT_WHEN_DOCUMENT_CREATED)
            .fromServer(DEFAULT_FROM_SERVER)
            .documentFileName(DEFAULT_DOCUMENT_FILE_NAME)
            .documentFullPath(DEFAULT_DOCUMENT_FULL_PATH)
            .documentStatus(DEFAULT_DOCUMENT_STATUS)
            .tryCount(DEFAULT_TRY_COUNT)
            .whenProcessed(DEFAULT_WHEN_PROCESSED)
            .processingDuration(DEFAULT_PROCESSING_DURATION)
            .processingInfo(DEFAULT_PROCESSING_INFO)
            .extraField(DEFAULT_EXTRA_FIELD);
        return printManagement;
    }

    @Before
    public void initTest() {
        printManagement = createEntity(em);
    }

    @Test
    @Transactional
    public void createPrintManagement() throws Exception {
        int databaseSizeBeforeCreate = printManagementRepository.findAll().size();

        // Create the PrintManagement
        restPrintManagementMockMvc.perform(post("/api/print-managements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(printManagement)))
            .andExpect(status().isCreated());

        // Validate the PrintManagement in the database
        List<PrintManagement> printManagementList = printManagementRepository.findAll();
        assertThat(printManagementList).hasSize(databaseSizeBeforeCreate + 1);
        PrintManagement testPrintManagement = printManagementList.get(printManagementList.size() - 1);
        assertThat(testPrintManagement.getPrinterName()).isEqualTo(DEFAULT_PRINTER_NAME);
        assertThat(testPrintManagement.getWhenDocumentCreated()).isEqualTo(DEFAULT_WHEN_DOCUMENT_CREATED);
        assertThat(testPrintManagement.getFromServer()).isEqualTo(DEFAULT_FROM_SERVER);
        assertThat(testPrintManagement.getDocumentFileName()).isEqualTo(DEFAULT_DOCUMENT_FILE_NAME);
        assertThat(testPrintManagement.getDocumentFullPath()).isEqualTo(DEFAULT_DOCUMENT_FULL_PATH);
        assertThat(testPrintManagement.getDocumentStatus()).isEqualTo(DEFAULT_DOCUMENT_STATUS);
        assertThat(testPrintManagement.getTryCount()).isEqualTo(DEFAULT_TRY_COUNT);
        assertThat(testPrintManagement.getWhenProcessed()).isEqualTo(DEFAULT_WHEN_PROCESSED);
        assertThat(testPrintManagement.getProcessingDuration()).isEqualTo(DEFAULT_PROCESSING_DURATION);
        assertThat(testPrintManagement.getProcessingInfo()).isEqualTo(DEFAULT_PROCESSING_INFO);
        assertThat(testPrintManagement.getExtraField()).isEqualTo(DEFAULT_EXTRA_FIELD);
    }

    @Test
    @Transactional
    public void createPrintManagementWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = printManagementRepository.findAll().size();

        // Create the PrintManagement with an existing ID
        printManagement.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrintManagementMockMvc.perform(post("/api/print-managements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(printManagement)))
            .andExpect(status().isBadRequest());

        // Validate the PrintManagement in the database
        List<PrintManagement> printManagementList = printManagementRepository.findAll();
        assertThat(printManagementList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPrintManagements() throws Exception {
        // Initialize the database
        printManagementRepository.saveAndFlush(printManagement);

        // Get all the printManagementList
        restPrintManagementMockMvc.perform(get("/api/print-managements?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(printManagement.getId().intValue())))
            .andExpect(jsonPath("$.[*].printerName").value(hasItem(DEFAULT_PRINTER_NAME.toString())))
            .andExpect(jsonPath("$.[*].whenDocumentCreated").value(hasItem(DEFAULT_WHEN_DOCUMENT_CREATED.toString())))
            .andExpect(jsonPath("$.[*].fromServer").value(hasItem(DEFAULT_FROM_SERVER.toString())))
            .andExpect(jsonPath("$.[*].documentFileName").value(hasItem(DEFAULT_DOCUMENT_FILE_NAME.toString())))
            .andExpect(jsonPath("$.[*].documentFullPath").value(hasItem(DEFAULT_DOCUMENT_FULL_PATH.toString())))
            .andExpect(jsonPath("$.[*].documentStatus").value(hasItem(DEFAULT_DOCUMENT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].tryCount").value(hasItem(DEFAULT_TRY_COUNT)))
            .andExpect(jsonPath("$.[*].whenProcessed").value(hasItem(DEFAULT_WHEN_PROCESSED.toString())))
            .andExpect(jsonPath("$.[*].processingDuration").value(hasItem(DEFAULT_PROCESSING_DURATION)))
            .andExpect(jsonPath("$.[*].processingInfo").value(hasItem(DEFAULT_PROCESSING_INFO.toString())))
            .andExpect(jsonPath("$.[*].extraField").value(hasItem(DEFAULT_EXTRA_FIELD.toString())));
    }

    @Test
    @Transactional
    public void getPrintManagement() throws Exception {
        // Initialize the database
        printManagementRepository.saveAndFlush(printManagement);

        // Get the printManagement
        restPrintManagementMockMvc.perform(get("/api/print-managements/{id}", printManagement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(printManagement.getId().intValue()))
            .andExpect(jsonPath("$.printerName").value(DEFAULT_PRINTER_NAME.toString()))
            .andExpect(jsonPath("$.whenDocumentCreated").value(DEFAULT_WHEN_DOCUMENT_CREATED.toString()))
            .andExpect(jsonPath("$.fromServer").value(DEFAULT_FROM_SERVER.toString()))
            .andExpect(jsonPath("$.documentFileName").value(DEFAULT_DOCUMENT_FILE_NAME.toString()))
            .andExpect(jsonPath("$.documentFullPath").value(DEFAULT_DOCUMENT_FULL_PATH.toString()))
            .andExpect(jsonPath("$.documentStatus").value(DEFAULT_DOCUMENT_STATUS.toString()))
            .andExpect(jsonPath("$.tryCount").value(DEFAULT_TRY_COUNT))
            .andExpect(jsonPath("$.whenProcessed").value(DEFAULT_WHEN_PROCESSED.toString()))
            .andExpect(jsonPath("$.processingDuration").value(DEFAULT_PROCESSING_DURATION))
            .andExpect(jsonPath("$.processingInfo").value(DEFAULT_PROCESSING_INFO.toString()))
            .andExpect(jsonPath("$.extraField").value(DEFAULT_EXTRA_FIELD.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPrintManagement() throws Exception {
        // Get the printManagement
        restPrintManagementMockMvc.perform(get("/api/print-managements/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePrintManagement() throws Exception {
        // Initialize the database
        printManagementRepository.saveAndFlush(printManagement);
        int databaseSizeBeforeUpdate = printManagementRepository.findAll().size();

        // Update the printManagement
        PrintManagement updatedPrintManagement = printManagementRepository.findOne(printManagement.getId());
        // Disconnect from session so that the updates on updatedPrintManagement are not directly saved in db
        em.detach(updatedPrintManagement);
        updatedPrintManagement
            .printerName(UPDATED_PRINTER_NAME)
            .whenDocumentCreated(UPDATED_WHEN_DOCUMENT_CREATED)
            .fromServer(UPDATED_FROM_SERVER)
            .documentFileName(UPDATED_DOCUMENT_FILE_NAME)
            .documentFullPath(UPDATED_DOCUMENT_FULL_PATH)
            .documentStatus(UPDATED_DOCUMENT_STATUS)
            .tryCount(UPDATED_TRY_COUNT)
            .whenProcessed(UPDATED_WHEN_PROCESSED)
            .processingDuration(UPDATED_PROCESSING_DURATION)
            .processingInfo(UPDATED_PROCESSING_INFO)
            .extraField(UPDATED_EXTRA_FIELD);

        restPrintManagementMockMvc.perform(put("/api/print-managements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPrintManagement)))
            .andExpect(status().isOk());

        // Validate the PrintManagement in the database
        List<PrintManagement> printManagementList = printManagementRepository.findAll();
        assertThat(printManagementList).hasSize(databaseSizeBeforeUpdate);
        PrintManagement testPrintManagement = printManagementList.get(printManagementList.size() - 1);
        assertThat(testPrintManagement.getPrinterName()).isEqualTo(UPDATED_PRINTER_NAME);
        assertThat(testPrintManagement.getWhenDocumentCreated()).isEqualTo(UPDATED_WHEN_DOCUMENT_CREATED);
        assertThat(testPrintManagement.getFromServer()).isEqualTo(UPDATED_FROM_SERVER);
        assertThat(testPrintManagement.getDocumentFileName()).isEqualTo(UPDATED_DOCUMENT_FILE_NAME);
        assertThat(testPrintManagement.getDocumentFullPath()).isEqualTo(UPDATED_DOCUMENT_FULL_PATH);
        assertThat(testPrintManagement.getDocumentStatus()).isEqualTo(UPDATED_DOCUMENT_STATUS);
        assertThat(testPrintManagement.getTryCount()).isEqualTo(UPDATED_TRY_COUNT);
        assertThat(testPrintManagement.getWhenProcessed()).isEqualTo(UPDATED_WHEN_PROCESSED);
        assertThat(testPrintManagement.getProcessingDuration()).isEqualTo(UPDATED_PROCESSING_DURATION);
        assertThat(testPrintManagement.getProcessingInfo()).isEqualTo(UPDATED_PROCESSING_INFO);
        assertThat(testPrintManagement.getExtraField()).isEqualTo(UPDATED_EXTRA_FIELD);
    }

    @Test
    @Transactional
    public void updateNonExistingPrintManagement() throws Exception {
        int databaseSizeBeforeUpdate = printManagementRepository.findAll().size();

        // Create the PrintManagement

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPrintManagementMockMvc.perform(put("/api/print-managements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(printManagement)))
            .andExpect(status().isCreated());

        // Validate the PrintManagement in the database
        List<PrintManagement> printManagementList = printManagementRepository.findAll();
        assertThat(printManagementList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePrintManagement() throws Exception {
        // Initialize the database
        printManagementRepository.saveAndFlush(printManagement);
        int databaseSizeBeforeDelete = printManagementRepository.findAll().size();

        // Get the printManagement
        restPrintManagementMockMvc.perform(delete("/api/print-managements/{id}", printManagement.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PrintManagement> printManagementList = printManagementRepository.findAll();
        assertThat(printManagementList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PrintManagement.class);
        PrintManagement printManagement1 = new PrintManagement();
        printManagement1.setId(1L);
        PrintManagement printManagement2 = new PrintManagement();
        printManagement2.setId(printManagement1.getId());
        assertThat(printManagement1).isEqualTo(printManagement2);
        printManagement2.setId(2L);
        assertThat(printManagement1).isNotEqualTo(printManagement2);
        printManagement1.setId(null);
        assertThat(printManagement1).isNotEqualTo(printManagement2);
    }
}
