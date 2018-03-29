package com.dxc.fsg.bps.ace.web.rest;

import com.dxc.fsg.bps.ace.AceApp;

import com.dxc.fsg.bps.ace.domain.AceCompany;
import com.dxc.fsg.bps.ace.repository.AceCompanyRepository;
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
 * Test class for the AceCompanyResource REST controller.
 *
 * @see AceCompanyResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AceApp.class)
public class AceCompanyResourceIntTest {

    private static final String DEFAULT_REGION_CODE = "AAAA";
    private static final String UPDATED_REGION_CODE = "BBBB";

    private static final String DEFAULT_COMPANY_CODE = "AAAAAA";
    private static final String UPDATED_COMPANY_CODE = "BBBBBB";

    private static final Boolean DEFAULT_CANADIAN = false;
    private static final Boolean UPDATED_CANADIAN = true;

    private static final String DEFAULT_LETTERHEAD = "AAAAAAAAAA";
    private static final String UPDATED_LETTERHEAD = "BBBBBBBBBB";

    private static final Boolean DEFAULT_REINSTATEMENT_CANADIAN = false;
    private static final Boolean UPDATED_REINSTATEMENT_CANADIAN = true;

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final Boolean DEFAULT_VARIABLE_PRODUCTS = false;
    private static final Boolean UPDATED_VARIABLE_PRODUCTS = true;

    private static final String DEFAULT_ADMIN_SYSTEM = "AAAAAAAAAA";
    private static final String UPDATED_ADMIN_SYSTEM = "BBBBBBBBBB";

    private static final String DEFAULT_WEB_SITE = "AAAAAAAAAA";
    private static final String UPDATED_WEB_SITE = "BBBBBBBBBB";

    private static final String DEFAULT_STAT_CO_CODE = "AAAAAAAAAA";
    private static final String UPDATED_STAT_CO_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_WEB_WORD = "AAAAAAAAAA";
    private static final String UPDATED_WEB_WORD = "BBBBBBBBBB";

    private static final String DEFAULT_OPT_PARAM = "AAAAAAAAAA";
    private static final String UPDATED_OPT_PARAM = "BBBBBBBBBB";

    private static final String DEFAULT_LOGO = "AAAAAAAAAA";
    private static final String UPDATED_LOGO = "BBBBBBBBBB";

    @Autowired
    private AceCompanyRepository aceCompanyRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAceCompanyMockMvc;

    private AceCompany aceCompany;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AceCompanyResource aceCompanyResource = new AceCompanyResource(aceCompanyRepository);
        this.restAceCompanyMockMvc = MockMvcBuilders.standaloneSetup(aceCompanyResource)
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
    public static AceCompany createEntity(EntityManager em) {
        AceCompany aceCompany = new AceCompany()
            .regionCode(DEFAULT_REGION_CODE)
            .companyCode(DEFAULT_COMPANY_CODE)
            .canadian(DEFAULT_CANADIAN)
            .letterhead(DEFAULT_LETTERHEAD)
            .reinstatementCanadian(DEFAULT_REINSTATEMENT_CANADIAN)
            .url(DEFAULT_URL)
            .variableProducts(DEFAULT_VARIABLE_PRODUCTS)
            .adminSystem(DEFAULT_ADMIN_SYSTEM)
            .webSite(DEFAULT_WEB_SITE)
            .statCoCode(DEFAULT_STAT_CO_CODE)
            .webWord(DEFAULT_WEB_WORD)
            .optParam(DEFAULT_OPT_PARAM)
            .logo(DEFAULT_LOGO);
        return aceCompany;
    }

    @Before
    public void initTest() {
        aceCompany = createEntity(em);
    }

    @Test
    @Transactional
    public void createAceCompany() throws Exception {
        int databaseSizeBeforeCreate = aceCompanyRepository.findAll().size();

        // Create the AceCompany
        restAceCompanyMockMvc.perform(post("/api/ace-companies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aceCompany)))
            .andExpect(status().isCreated());

        // Validate the AceCompany in the database
        List<AceCompany> aceCompanyList = aceCompanyRepository.findAll();
        assertThat(aceCompanyList).hasSize(databaseSizeBeforeCreate + 1);
        AceCompany testAceCompany = aceCompanyList.get(aceCompanyList.size() - 1);
        assertThat(testAceCompany.getRegionCode()).isEqualTo(DEFAULT_REGION_CODE);
        assertThat(testAceCompany.getCompanyCode()).isEqualTo(DEFAULT_COMPANY_CODE);
        assertThat(testAceCompany.isCanadian()).isEqualTo(DEFAULT_CANADIAN);
        assertThat(testAceCompany.getLetterhead()).isEqualTo(DEFAULT_LETTERHEAD);
        assertThat(testAceCompany.isReinstatementCanadian()).isEqualTo(DEFAULT_REINSTATEMENT_CANADIAN);
        assertThat(testAceCompany.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testAceCompany.isVariableProducts()).isEqualTo(DEFAULT_VARIABLE_PRODUCTS);
        assertThat(testAceCompany.getAdminSystem()).isEqualTo(DEFAULT_ADMIN_SYSTEM);
        assertThat(testAceCompany.getWebSite()).isEqualTo(DEFAULT_WEB_SITE);
        assertThat(testAceCompany.getStatCoCode()).isEqualTo(DEFAULT_STAT_CO_CODE);
        assertThat(testAceCompany.getWebWord()).isEqualTo(DEFAULT_WEB_WORD);
        assertThat(testAceCompany.getOptParam()).isEqualTo(DEFAULT_OPT_PARAM);
        assertThat(testAceCompany.getLogo()).isEqualTo(DEFAULT_LOGO);
    }

    @Test
    @Transactional
    public void createAceCompanyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = aceCompanyRepository.findAll().size();

        // Create the AceCompany with an existing ID
        aceCompany.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAceCompanyMockMvc.perform(post("/api/ace-companies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aceCompany)))
            .andExpect(status().isBadRequest());

        // Validate the AceCompany in the database
        List<AceCompany> aceCompanyList = aceCompanyRepository.findAll();
        assertThat(aceCompanyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAceCompanies() throws Exception {
        // Initialize the database
        aceCompanyRepository.saveAndFlush(aceCompany);

        // Get all the aceCompanyList
        restAceCompanyMockMvc.perform(get("/api/ace-companies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(aceCompany.getId().intValue())))
            .andExpect(jsonPath("$.[*].regionCode").value(hasItem(DEFAULT_REGION_CODE.toString())))
            .andExpect(jsonPath("$.[*].companyCode").value(hasItem(DEFAULT_COMPANY_CODE.toString())))
            .andExpect(jsonPath("$.[*].canadian").value(hasItem(DEFAULT_CANADIAN.booleanValue())))
            .andExpect(jsonPath("$.[*].letterhead").value(hasItem(DEFAULT_LETTERHEAD.toString())))
            .andExpect(jsonPath("$.[*].reinstatementCanadian").value(hasItem(DEFAULT_REINSTATEMENT_CANADIAN.booleanValue())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())))
            .andExpect(jsonPath("$.[*].variableProducts").value(hasItem(DEFAULT_VARIABLE_PRODUCTS.booleanValue())))
            .andExpect(jsonPath("$.[*].adminSystem").value(hasItem(DEFAULT_ADMIN_SYSTEM.toString())))
            .andExpect(jsonPath("$.[*].webSite").value(hasItem(DEFAULT_WEB_SITE.toString())))
            .andExpect(jsonPath("$.[*].statCoCode").value(hasItem(DEFAULT_STAT_CO_CODE.toString())))
            .andExpect(jsonPath("$.[*].webWord").value(hasItem(DEFAULT_WEB_WORD.toString())))
            .andExpect(jsonPath("$.[*].optParam").value(hasItem(DEFAULT_OPT_PARAM.toString())))
            .andExpect(jsonPath("$.[*].logo").value(hasItem(DEFAULT_LOGO.toString())));
    }

    @Test
    @Transactional
    public void getAceCompany() throws Exception {
        // Initialize the database
        aceCompanyRepository.saveAndFlush(aceCompany);

        // Get the aceCompany
        restAceCompanyMockMvc.perform(get("/api/ace-companies/{id}", aceCompany.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(aceCompany.getId().intValue()))
            .andExpect(jsonPath("$.regionCode").value(DEFAULT_REGION_CODE.toString()))
            .andExpect(jsonPath("$.companyCode").value(DEFAULT_COMPANY_CODE.toString()))
            .andExpect(jsonPath("$.canadian").value(DEFAULT_CANADIAN.booleanValue()))
            .andExpect(jsonPath("$.letterhead").value(DEFAULT_LETTERHEAD.toString()))
            .andExpect(jsonPath("$.reinstatementCanadian").value(DEFAULT_REINSTATEMENT_CANADIAN.booleanValue()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL.toString()))
            .andExpect(jsonPath("$.variableProducts").value(DEFAULT_VARIABLE_PRODUCTS.booleanValue()))
            .andExpect(jsonPath("$.adminSystem").value(DEFAULT_ADMIN_SYSTEM.toString()))
            .andExpect(jsonPath("$.webSite").value(DEFAULT_WEB_SITE.toString()))
            .andExpect(jsonPath("$.statCoCode").value(DEFAULT_STAT_CO_CODE.toString()))
            .andExpect(jsonPath("$.webWord").value(DEFAULT_WEB_WORD.toString()))
            .andExpect(jsonPath("$.optParam").value(DEFAULT_OPT_PARAM.toString()))
            .andExpect(jsonPath("$.logo").value(DEFAULT_LOGO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAceCompany() throws Exception {
        // Get the aceCompany
        restAceCompanyMockMvc.perform(get("/api/ace-companies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAceCompany() throws Exception {
        // Initialize the database
        aceCompanyRepository.saveAndFlush(aceCompany);
        int databaseSizeBeforeUpdate = aceCompanyRepository.findAll().size();

        // Update the aceCompany
        AceCompany updatedAceCompany = aceCompanyRepository.findOne(aceCompany.getId());
        // Disconnect from session so that the updates on updatedAceCompany are not directly saved in db
        em.detach(updatedAceCompany);
        updatedAceCompany
            .regionCode(UPDATED_REGION_CODE)
            .companyCode(UPDATED_COMPANY_CODE)
            .canadian(UPDATED_CANADIAN)
            .letterhead(UPDATED_LETTERHEAD)
            .reinstatementCanadian(UPDATED_REINSTATEMENT_CANADIAN)
            .url(UPDATED_URL)
            .variableProducts(UPDATED_VARIABLE_PRODUCTS)
            .adminSystem(UPDATED_ADMIN_SYSTEM)
            .webSite(UPDATED_WEB_SITE)
            .statCoCode(UPDATED_STAT_CO_CODE)
            .webWord(UPDATED_WEB_WORD)
            .optParam(UPDATED_OPT_PARAM)
            .logo(UPDATED_LOGO);

        restAceCompanyMockMvc.perform(put("/api/ace-companies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAceCompany)))
            .andExpect(status().isOk());

        // Validate the AceCompany in the database
        List<AceCompany> aceCompanyList = aceCompanyRepository.findAll();
        assertThat(aceCompanyList).hasSize(databaseSizeBeforeUpdate);
        AceCompany testAceCompany = aceCompanyList.get(aceCompanyList.size() - 1);
        assertThat(testAceCompany.getRegionCode()).isEqualTo(UPDATED_REGION_CODE);
        assertThat(testAceCompany.getCompanyCode()).isEqualTo(UPDATED_COMPANY_CODE);
        assertThat(testAceCompany.isCanadian()).isEqualTo(UPDATED_CANADIAN);
        assertThat(testAceCompany.getLetterhead()).isEqualTo(UPDATED_LETTERHEAD);
        assertThat(testAceCompany.isReinstatementCanadian()).isEqualTo(UPDATED_REINSTATEMENT_CANADIAN);
        assertThat(testAceCompany.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testAceCompany.isVariableProducts()).isEqualTo(UPDATED_VARIABLE_PRODUCTS);
        assertThat(testAceCompany.getAdminSystem()).isEqualTo(UPDATED_ADMIN_SYSTEM);
        assertThat(testAceCompany.getWebSite()).isEqualTo(UPDATED_WEB_SITE);
        assertThat(testAceCompany.getStatCoCode()).isEqualTo(UPDATED_STAT_CO_CODE);
        assertThat(testAceCompany.getWebWord()).isEqualTo(UPDATED_WEB_WORD);
        assertThat(testAceCompany.getOptParam()).isEqualTo(UPDATED_OPT_PARAM);
        assertThat(testAceCompany.getLogo()).isEqualTo(UPDATED_LOGO);
    }

    @Test
    @Transactional
    public void updateNonExistingAceCompany() throws Exception {
        int databaseSizeBeforeUpdate = aceCompanyRepository.findAll().size();

        // Create the AceCompany

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAceCompanyMockMvc.perform(put("/api/ace-companies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aceCompany)))
            .andExpect(status().isCreated());

        // Validate the AceCompany in the database
        List<AceCompany> aceCompanyList = aceCompanyRepository.findAll();
        assertThat(aceCompanyList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAceCompany() throws Exception {
        // Initialize the database
        aceCompanyRepository.saveAndFlush(aceCompany);
        int databaseSizeBeforeDelete = aceCompanyRepository.findAll().size();

        // Get the aceCompany
        restAceCompanyMockMvc.perform(delete("/api/ace-companies/{id}", aceCompany.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AceCompany> aceCompanyList = aceCompanyRepository.findAll();
        assertThat(aceCompanyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AceCompany.class);
        AceCompany aceCompany1 = new AceCompany();
        aceCompany1.setId(1L);
        AceCompany aceCompany2 = new AceCompany();
        aceCompany2.setId(aceCompany1.getId());
        assertThat(aceCompany1).isEqualTo(aceCompany2);
        aceCompany2.setId(2L);
        assertThat(aceCompany1).isNotEqualTo(aceCompany2);
        aceCompany1.setId(null);
        assertThat(aceCompany1).isNotEqualTo(aceCompany2);
    }
}
