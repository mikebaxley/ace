package com.dxc.fsg.bps.ace.web.rest;

import com.dxc.fsg.bps.ace.AceApp;

import com.dxc.fsg.bps.ace.domain.TemplateParameters;
import com.dxc.fsg.bps.ace.repository.TemplateParametersRepository;
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
 * Test class for the TemplateParametersResource REST controller.
 *
 * @see TemplateParametersResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AceApp.class)
public class TemplateParametersResourceIntTest {

    private static final String DEFAULT_PARAMETER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PARAMETER_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_VALUE_FORMULA = "AAAAAAAAAA";
    private static final String UPDATED_VALUE_FORMULA = "BBBBBBBBBB";

    private static final Boolean DEFAULT_REQUIRED = false;
    private static final Boolean UPDATED_REQUIRED = true;

    private static final String DEFAULT_UI_FRAGMENT_KEY = "AAAAAAAAAA";
    private static final String UPDATED_UI_FRAGMENT_KEY = "BBBBBBBBBB";

    @Autowired
    private TemplateParametersRepository templateParametersRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTemplateParametersMockMvc;

    private TemplateParameters templateParameters;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TemplateParametersResource templateParametersResource = new TemplateParametersResource(templateParametersRepository);
        this.restTemplateParametersMockMvc = MockMvcBuilders.standaloneSetup(templateParametersResource)
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
    public static TemplateParameters createEntity(EntityManager em) {
        TemplateParameters templateParameters = new TemplateParameters()
            .parameterName(DEFAULT_PARAMETER_NAME)
            .valueFormula(DEFAULT_VALUE_FORMULA)
            .required(DEFAULT_REQUIRED)
            .uiFragmentKey(DEFAULT_UI_FRAGMENT_KEY);
        return templateParameters;
    }

    @Before
    public void initTest() {
        templateParameters = createEntity(em);
    }

    @Test
    @Transactional
    public void createTemplateParameters() throws Exception {
        int databaseSizeBeforeCreate = templateParametersRepository.findAll().size();

        // Create the TemplateParameters
        restTemplateParametersMockMvc.perform(post("/api/template-parameters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(templateParameters)))
            .andExpect(status().isCreated());

        // Validate the TemplateParameters in the database
        List<TemplateParameters> templateParametersList = templateParametersRepository.findAll();
        assertThat(templateParametersList).hasSize(databaseSizeBeforeCreate + 1);
        TemplateParameters testTemplateParameters = templateParametersList.get(templateParametersList.size() - 1);
        assertThat(testTemplateParameters.getParameterName()).isEqualTo(DEFAULT_PARAMETER_NAME);
        assertThat(testTemplateParameters.getValueFormula()).isEqualTo(DEFAULT_VALUE_FORMULA);
        assertThat(testTemplateParameters.isRequired()).isEqualTo(DEFAULT_REQUIRED);
        assertThat(testTemplateParameters.getUiFragmentKey()).isEqualTo(DEFAULT_UI_FRAGMENT_KEY);
    }

    @Test
    @Transactional
    public void createTemplateParametersWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = templateParametersRepository.findAll().size();

        // Create the TemplateParameters with an existing ID
        templateParameters.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTemplateParametersMockMvc.perform(post("/api/template-parameters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(templateParameters)))
            .andExpect(status().isBadRequest());

        // Validate the TemplateParameters in the database
        List<TemplateParameters> templateParametersList = templateParametersRepository.findAll();
        assertThat(templateParametersList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTemplateParameters() throws Exception {
        // Initialize the database
        templateParametersRepository.saveAndFlush(templateParameters);

        // Get all the templateParametersList
        restTemplateParametersMockMvc.perform(get("/api/template-parameters?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(templateParameters.getId().intValue())))
            .andExpect(jsonPath("$.[*].parameterName").value(hasItem(DEFAULT_PARAMETER_NAME.toString())))
            .andExpect(jsonPath("$.[*].valueFormula").value(hasItem(DEFAULT_VALUE_FORMULA.toString())))
            .andExpect(jsonPath("$.[*].required").value(hasItem(DEFAULT_REQUIRED.booleanValue())))
            .andExpect(jsonPath("$.[*].uiFragmentKey").value(hasItem(DEFAULT_UI_FRAGMENT_KEY.toString())));
    }

    @Test
    @Transactional
    public void getTemplateParameters() throws Exception {
        // Initialize the database
        templateParametersRepository.saveAndFlush(templateParameters);

        // Get the templateParameters
        restTemplateParametersMockMvc.perform(get("/api/template-parameters/{id}", templateParameters.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(templateParameters.getId().intValue()))
            .andExpect(jsonPath("$.parameterName").value(DEFAULT_PARAMETER_NAME.toString()))
            .andExpect(jsonPath("$.valueFormula").value(DEFAULT_VALUE_FORMULA.toString()))
            .andExpect(jsonPath("$.required").value(DEFAULT_REQUIRED.booleanValue()))
            .andExpect(jsonPath("$.uiFragmentKey").value(DEFAULT_UI_FRAGMENT_KEY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTemplateParameters() throws Exception {
        // Get the templateParameters
        restTemplateParametersMockMvc.perform(get("/api/template-parameters/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTemplateParameters() throws Exception {
        // Initialize the database
        templateParametersRepository.saveAndFlush(templateParameters);
        int databaseSizeBeforeUpdate = templateParametersRepository.findAll().size();

        // Update the templateParameters
        TemplateParameters updatedTemplateParameters = templateParametersRepository.findOne(templateParameters.getId());
        // Disconnect from session so that the updates on updatedTemplateParameters are not directly saved in db
        em.detach(updatedTemplateParameters);
        updatedTemplateParameters
            .parameterName(UPDATED_PARAMETER_NAME)
            .valueFormula(UPDATED_VALUE_FORMULA)
            .required(UPDATED_REQUIRED)
            .uiFragmentKey(UPDATED_UI_FRAGMENT_KEY);

        restTemplateParametersMockMvc.perform(put("/api/template-parameters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTemplateParameters)))
            .andExpect(status().isOk());

        // Validate the TemplateParameters in the database
        List<TemplateParameters> templateParametersList = templateParametersRepository.findAll();
        assertThat(templateParametersList).hasSize(databaseSizeBeforeUpdate);
        TemplateParameters testTemplateParameters = templateParametersList.get(templateParametersList.size() - 1);
        assertThat(testTemplateParameters.getParameterName()).isEqualTo(UPDATED_PARAMETER_NAME);
        assertThat(testTemplateParameters.getValueFormula()).isEqualTo(UPDATED_VALUE_FORMULA);
        assertThat(testTemplateParameters.isRequired()).isEqualTo(UPDATED_REQUIRED);
        assertThat(testTemplateParameters.getUiFragmentKey()).isEqualTo(UPDATED_UI_FRAGMENT_KEY);
    }

    @Test
    @Transactional
    public void updateNonExistingTemplateParameters() throws Exception {
        int databaseSizeBeforeUpdate = templateParametersRepository.findAll().size();

        // Create the TemplateParameters

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTemplateParametersMockMvc.perform(put("/api/template-parameters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(templateParameters)))
            .andExpect(status().isCreated());

        // Validate the TemplateParameters in the database
        List<TemplateParameters> templateParametersList = templateParametersRepository.findAll();
        assertThat(templateParametersList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTemplateParameters() throws Exception {
        // Initialize the database
        templateParametersRepository.saveAndFlush(templateParameters);
        int databaseSizeBeforeDelete = templateParametersRepository.findAll().size();

        // Get the templateParameters
        restTemplateParametersMockMvc.perform(delete("/api/template-parameters/{id}", templateParameters.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TemplateParameters> templateParametersList = templateParametersRepository.findAll();
        assertThat(templateParametersList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TemplateParameters.class);
        TemplateParameters templateParameters1 = new TemplateParameters();
        templateParameters1.setId(1L);
        TemplateParameters templateParameters2 = new TemplateParameters();
        templateParameters2.setId(templateParameters1.getId());
        assertThat(templateParameters1).isEqualTo(templateParameters2);
        templateParameters2.setId(2L);
        assertThat(templateParameters1).isNotEqualTo(templateParameters2);
        templateParameters1.setId(null);
        assertThat(templateParameters1).isNotEqualTo(templateParameters2);
    }
}
