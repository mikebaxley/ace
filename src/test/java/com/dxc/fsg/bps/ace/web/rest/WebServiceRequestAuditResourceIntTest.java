package com.dxc.fsg.bps.ace.web.rest;

import com.dxc.fsg.bps.ace.AceApp;

import com.dxc.fsg.bps.ace.domain.WebServiceRequestAudit;
import com.dxc.fsg.bps.ace.repository.WebServiceRequestAuditRepository;
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
 * Test class for the WebServiceRequestAuditResource REST controller.
 *
 * @see WebServiceRequestAuditResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AceApp.class)
public class WebServiceRequestAuditResourceIntTest {

    private static final Instant DEFAULT_REQUEST_WHEN = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_REQUEST_WHEN = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_OPERATION = "AAAAAAAAAA";
    private static final String UPDATED_OPERATION = "BBBBBBBBBB";

    private static final Integer DEFAULT_DURATION_MS = 1;
    private static final Integer UPDATED_DURATION_MS = 2;

    private static final String DEFAULT_EXCEPTION = "AAAAAAAAAA";
    private static final String UPDATED_EXCEPTION = "BBBBBBBBBB";

    private static final String DEFAULT_WS_REQUEST = "AAAAAAAAAA";
    private static final String UPDATED_WS_REQUEST = "BBBBBBBBBB";

    private static final String DEFAULT_WS_RESPONSE = "AAAAAAAAAA";
    private static final String UPDATED_WS_RESPONSE = "BBBBBBBBBB";

    private static final String DEFAULT_CALLING_APP = "AAAAAAAAAA";
    private static final String UPDATED_CALLING_APP = "BBBBBBBBBB";

    private static final String DEFAULT_FROM_SERVER = "AAAAAAAAAA";
    private static final String UPDATED_FROM_SERVER = "BBBBBBBBBB";

    private static final String DEFAULT_EXTRA_FIELD = "AAAAAAAAAA";
    private static final String UPDATED_EXTRA_FIELD = "BBBBBBBBBB";

    @Autowired
    private WebServiceRequestAuditRepository webServiceRequestAuditRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restWebServiceRequestAuditMockMvc;

    private WebServiceRequestAudit webServiceRequestAudit;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WebServiceRequestAuditResource webServiceRequestAuditResource = new WebServiceRequestAuditResource(webServiceRequestAuditRepository);
        this.restWebServiceRequestAuditMockMvc = MockMvcBuilders.standaloneSetup(webServiceRequestAuditResource)
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
    public static WebServiceRequestAudit createEntity(EntityManager em) {
        WebServiceRequestAudit webServiceRequestAudit = new WebServiceRequestAudit()
            .requestWhen(DEFAULT_REQUEST_WHEN)
            .operation(DEFAULT_OPERATION)
            .durationMs(DEFAULT_DURATION_MS)
            .exception(DEFAULT_EXCEPTION)
            .wsRequest(DEFAULT_WS_REQUEST)
            .wsResponse(DEFAULT_WS_RESPONSE)
            .callingApp(DEFAULT_CALLING_APP)
            .fromServer(DEFAULT_FROM_SERVER)
            .extraField(DEFAULT_EXTRA_FIELD);
        return webServiceRequestAudit;
    }

    @Before
    public void initTest() {
        webServiceRequestAudit = createEntity(em);
    }

    @Test
    @Transactional
    public void createWebServiceRequestAudit() throws Exception {
        int databaseSizeBeforeCreate = webServiceRequestAuditRepository.findAll().size();

        // Create the WebServiceRequestAudit
        restWebServiceRequestAuditMockMvc.perform(post("/api/web-service-request-audits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(webServiceRequestAudit)))
            .andExpect(status().isCreated());

        // Validate the WebServiceRequestAudit in the database
        List<WebServiceRequestAudit> webServiceRequestAuditList = webServiceRequestAuditRepository.findAll();
        assertThat(webServiceRequestAuditList).hasSize(databaseSizeBeforeCreate + 1);
        WebServiceRequestAudit testWebServiceRequestAudit = webServiceRequestAuditList.get(webServiceRequestAuditList.size() - 1);
        assertThat(testWebServiceRequestAudit.getRequestWhen()).isEqualTo(DEFAULT_REQUEST_WHEN);
        assertThat(testWebServiceRequestAudit.getOperation()).isEqualTo(DEFAULT_OPERATION);
        assertThat(testWebServiceRequestAudit.getDurationMs()).isEqualTo(DEFAULT_DURATION_MS);
        assertThat(testWebServiceRequestAudit.getException()).isEqualTo(DEFAULT_EXCEPTION);
        assertThat(testWebServiceRequestAudit.getWsRequest()).isEqualTo(DEFAULT_WS_REQUEST);
        assertThat(testWebServiceRequestAudit.getWsResponse()).isEqualTo(DEFAULT_WS_RESPONSE);
        assertThat(testWebServiceRequestAudit.getCallingApp()).isEqualTo(DEFAULT_CALLING_APP);
        assertThat(testWebServiceRequestAudit.getFromServer()).isEqualTo(DEFAULT_FROM_SERVER);
        assertThat(testWebServiceRequestAudit.getExtraField()).isEqualTo(DEFAULT_EXTRA_FIELD);
    }

    @Test
    @Transactional
    public void createWebServiceRequestAuditWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = webServiceRequestAuditRepository.findAll().size();

        // Create the WebServiceRequestAudit with an existing ID
        webServiceRequestAudit.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWebServiceRequestAuditMockMvc.perform(post("/api/web-service-request-audits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(webServiceRequestAudit)))
            .andExpect(status().isBadRequest());

        // Validate the WebServiceRequestAudit in the database
        List<WebServiceRequestAudit> webServiceRequestAuditList = webServiceRequestAuditRepository.findAll();
        assertThat(webServiceRequestAuditList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllWebServiceRequestAudits() throws Exception {
        // Initialize the database
        webServiceRequestAuditRepository.saveAndFlush(webServiceRequestAudit);

        // Get all the webServiceRequestAuditList
        restWebServiceRequestAuditMockMvc.perform(get("/api/web-service-request-audits?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(webServiceRequestAudit.getId().intValue())))
            .andExpect(jsonPath("$.[*].requestWhen").value(hasItem(DEFAULT_REQUEST_WHEN.toString())))
            .andExpect(jsonPath("$.[*].operation").value(hasItem(DEFAULT_OPERATION.toString())))
            .andExpect(jsonPath("$.[*].durationMs").value(hasItem(DEFAULT_DURATION_MS)))
            .andExpect(jsonPath("$.[*].exception").value(hasItem(DEFAULT_EXCEPTION.toString())))
            .andExpect(jsonPath("$.[*].wsRequest").value(hasItem(DEFAULT_WS_REQUEST.toString())))
            .andExpect(jsonPath("$.[*].wsResponse").value(hasItem(DEFAULT_WS_RESPONSE.toString())))
            .andExpect(jsonPath("$.[*].callingApp").value(hasItem(DEFAULT_CALLING_APP.toString())))
            .andExpect(jsonPath("$.[*].fromServer").value(hasItem(DEFAULT_FROM_SERVER.toString())))
            .andExpect(jsonPath("$.[*].extraField").value(hasItem(DEFAULT_EXTRA_FIELD.toString())));
    }

    @Test
    @Transactional
    public void getWebServiceRequestAudit() throws Exception {
        // Initialize the database
        webServiceRequestAuditRepository.saveAndFlush(webServiceRequestAudit);

        // Get the webServiceRequestAudit
        restWebServiceRequestAuditMockMvc.perform(get("/api/web-service-request-audits/{id}", webServiceRequestAudit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(webServiceRequestAudit.getId().intValue()))
            .andExpect(jsonPath("$.requestWhen").value(DEFAULT_REQUEST_WHEN.toString()))
            .andExpect(jsonPath("$.operation").value(DEFAULT_OPERATION.toString()))
            .andExpect(jsonPath("$.durationMs").value(DEFAULT_DURATION_MS))
            .andExpect(jsonPath("$.exception").value(DEFAULT_EXCEPTION.toString()))
            .andExpect(jsonPath("$.wsRequest").value(DEFAULT_WS_REQUEST.toString()))
            .andExpect(jsonPath("$.wsResponse").value(DEFAULT_WS_RESPONSE.toString()))
            .andExpect(jsonPath("$.callingApp").value(DEFAULT_CALLING_APP.toString()))
            .andExpect(jsonPath("$.fromServer").value(DEFAULT_FROM_SERVER.toString()))
            .andExpect(jsonPath("$.extraField").value(DEFAULT_EXTRA_FIELD.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingWebServiceRequestAudit() throws Exception {
        // Get the webServiceRequestAudit
        restWebServiceRequestAuditMockMvc.perform(get("/api/web-service-request-audits/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWebServiceRequestAudit() throws Exception {
        // Initialize the database
        webServiceRequestAuditRepository.saveAndFlush(webServiceRequestAudit);
        int databaseSizeBeforeUpdate = webServiceRequestAuditRepository.findAll().size();

        // Update the webServiceRequestAudit
        WebServiceRequestAudit updatedWebServiceRequestAudit = webServiceRequestAuditRepository.findOne(webServiceRequestAudit.getId());
        // Disconnect from session so that the updates on updatedWebServiceRequestAudit are not directly saved in db
        em.detach(updatedWebServiceRequestAudit);
        updatedWebServiceRequestAudit
            .requestWhen(UPDATED_REQUEST_WHEN)
            .operation(UPDATED_OPERATION)
            .durationMs(UPDATED_DURATION_MS)
            .exception(UPDATED_EXCEPTION)
            .wsRequest(UPDATED_WS_REQUEST)
            .wsResponse(UPDATED_WS_RESPONSE)
            .callingApp(UPDATED_CALLING_APP)
            .fromServer(UPDATED_FROM_SERVER)
            .extraField(UPDATED_EXTRA_FIELD);

        restWebServiceRequestAuditMockMvc.perform(put("/api/web-service-request-audits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWebServiceRequestAudit)))
            .andExpect(status().isOk());

        // Validate the WebServiceRequestAudit in the database
        List<WebServiceRequestAudit> webServiceRequestAuditList = webServiceRequestAuditRepository.findAll();
        assertThat(webServiceRequestAuditList).hasSize(databaseSizeBeforeUpdate);
        WebServiceRequestAudit testWebServiceRequestAudit = webServiceRequestAuditList.get(webServiceRequestAuditList.size() - 1);
        assertThat(testWebServiceRequestAudit.getRequestWhen()).isEqualTo(UPDATED_REQUEST_WHEN);
        assertThat(testWebServiceRequestAudit.getOperation()).isEqualTo(UPDATED_OPERATION);
        assertThat(testWebServiceRequestAudit.getDurationMs()).isEqualTo(UPDATED_DURATION_MS);
        assertThat(testWebServiceRequestAudit.getException()).isEqualTo(UPDATED_EXCEPTION);
        assertThat(testWebServiceRequestAudit.getWsRequest()).isEqualTo(UPDATED_WS_REQUEST);
        assertThat(testWebServiceRequestAudit.getWsResponse()).isEqualTo(UPDATED_WS_RESPONSE);
        assertThat(testWebServiceRequestAudit.getCallingApp()).isEqualTo(UPDATED_CALLING_APP);
        assertThat(testWebServiceRequestAudit.getFromServer()).isEqualTo(UPDATED_FROM_SERVER);
        assertThat(testWebServiceRequestAudit.getExtraField()).isEqualTo(UPDATED_EXTRA_FIELD);
    }

    @Test
    @Transactional
    public void updateNonExistingWebServiceRequestAudit() throws Exception {
        int databaseSizeBeforeUpdate = webServiceRequestAuditRepository.findAll().size();

        // Create the WebServiceRequestAudit

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restWebServiceRequestAuditMockMvc.perform(put("/api/web-service-request-audits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(webServiceRequestAudit)))
            .andExpect(status().isCreated());

        // Validate the WebServiceRequestAudit in the database
        List<WebServiceRequestAudit> webServiceRequestAuditList = webServiceRequestAuditRepository.findAll();
        assertThat(webServiceRequestAuditList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteWebServiceRequestAudit() throws Exception {
        // Initialize the database
        webServiceRequestAuditRepository.saveAndFlush(webServiceRequestAudit);
        int databaseSizeBeforeDelete = webServiceRequestAuditRepository.findAll().size();

        // Get the webServiceRequestAudit
        restWebServiceRequestAuditMockMvc.perform(delete("/api/web-service-request-audits/{id}", webServiceRequestAudit.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<WebServiceRequestAudit> webServiceRequestAuditList = webServiceRequestAuditRepository.findAll();
        assertThat(webServiceRequestAuditList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WebServiceRequestAudit.class);
        WebServiceRequestAudit webServiceRequestAudit1 = new WebServiceRequestAudit();
        webServiceRequestAudit1.setId(1L);
        WebServiceRequestAudit webServiceRequestAudit2 = new WebServiceRequestAudit();
        webServiceRequestAudit2.setId(webServiceRequestAudit1.getId());
        assertThat(webServiceRequestAudit1).isEqualTo(webServiceRequestAudit2);
        webServiceRequestAudit2.setId(2L);
        assertThat(webServiceRequestAudit1).isNotEqualTo(webServiceRequestAudit2);
        webServiceRequestAudit1.setId(null);
        assertThat(webServiceRequestAudit1).isNotEqualTo(webServiceRequestAudit2);
    }
}
