package com.dxc.fsg.bps.ace.web.rest;

import com.dxc.fsg.bps.ace.AceApp;

import com.dxc.fsg.bps.ace.domain.AceCompanyTag;
import com.dxc.fsg.bps.ace.repository.AceCompanyTagRepository;
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
 * Test class for the AceCompanyTagResource REST controller.
 *
 * @see AceCompanyTagResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AceApp.class)
public class AceCompanyTagResourceIntTest {

    private static final String DEFAULT_COMPANY_TAG = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY_TAG = "BBBBBBBBBB";

    private static final String DEFAULT_COMPANY_TAG_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY_TAG_VALUE = "BBBBBBBBBB";

    @Autowired
    private AceCompanyTagRepository aceCompanyTagRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAceCompanyTagMockMvc;

    private AceCompanyTag aceCompanyTag;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AceCompanyTagResource aceCompanyTagResource = new AceCompanyTagResource(aceCompanyTagRepository);
        this.restAceCompanyTagMockMvc = MockMvcBuilders.standaloneSetup(aceCompanyTagResource)
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
    public static AceCompanyTag createEntity(EntityManager em) {
        AceCompanyTag aceCompanyTag = new AceCompanyTag()
            .companyTag(DEFAULT_COMPANY_TAG)
            .companyTagValue(DEFAULT_COMPANY_TAG_VALUE);
        return aceCompanyTag;
    }

    @Before
    public void initTest() {
        aceCompanyTag = createEntity(em);
    }

    @Test
    @Transactional
    public void createAceCompanyTag() throws Exception {
        int databaseSizeBeforeCreate = aceCompanyTagRepository.findAll().size();

        // Create the AceCompanyTag
        restAceCompanyTagMockMvc.perform(post("/api/ace-company-tags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aceCompanyTag)))
            .andExpect(status().isCreated());

        // Validate the AceCompanyTag in the database
        List<AceCompanyTag> aceCompanyTagList = aceCompanyTagRepository.findAll();
        assertThat(aceCompanyTagList).hasSize(databaseSizeBeforeCreate + 1);
        AceCompanyTag testAceCompanyTag = aceCompanyTagList.get(aceCompanyTagList.size() - 1);
        assertThat(testAceCompanyTag.getCompanyTag()).isEqualTo(DEFAULT_COMPANY_TAG);
        assertThat(testAceCompanyTag.getCompanyTagValue()).isEqualTo(DEFAULT_COMPANY_TAG_VALUE);
    }

    @Test
    @Transactional
    public void createAceCompanyTagWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = aceCompanyTagRepository.findAll().size();

        // Create the AceCompanyTag with an existing ID
        aceCompanyTag.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAceCompanyTagMockMvc.perform(post("/api/ace-company-tags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aceCompanyTag)))
            .andExpect(status().isBadRequest());

        // Validate the AceCompanyTag in the database
        List<AceCompanyTag> aceCompanyTagList = aceCompanyTagRepository.findAll();
        assertThat(aceCompanyTagList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAceCompanyTags() throws Exception {
        // Initialize the database
        aceCompanyTagRepository.saveAndFlush(aceCompanyTag);

        // Get all the aceCompanyTagList
        restAceCompanyTagMockMvc.perform(get("/api/ace-company-tags?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(aceCompanyTag.getId().intValue())))
            .andExpect(jsonPath("$.[*].companyTag").value(hasItem(DEFAULT_COMPANY_TAG.toString())))
            .andExpect(jsonPath("$.[*].companyTagValue").value(hasItem(DEFAULT_COMPANY_TAG_VALUE.toString())));
    }

    @Test
    @Transactional
    public void getAceCompanyTag() throws Exception {
        // Initialize the database
        aceCompanyTagRepository.saveAndFlush(aceCompanyTag);

        // Get the aceCompanyTag
        restAceCompanyTagMockMvc.perform(get("/api/ace-company-tags/{id}", aceCompanyTag.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(aceCompanyTag.getId().intValue()))
            .andExpect(jsonPath("$.companyTag").value(DEFAULT_COMPANY_TAG.toString()))
            .andExpect(jsonPath("$.companyTagValue").value(DEFAULT_COMPANY_TAG_VALUE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAceCompanyTag() throws Exception {
        // Get the aceCompanyTag
        restAceCompanyTagMockMvc.perform(get("/api/ace-company-tags/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAceCompanyTag() throws Exception {
        // Initialize the database
        aceCompanyTagRepository.saveAndFlush(aceCompanyTag);
        int databaseSizeBeforeUpdate = aceCompanyTagRepository.findAll().size();

        // Update the aceCompanyTag
        AceCompanyTag updatedAceCompanyTag = aceCompanyTagRepository.findOne(aceCompanyTag.getId());
        // Disconnect from session so that the updates on updatedAceCompanyTag are not directly saved in db
        em.detach(updatedAceCompanyTag);
        updatedAceCompanyTag
            .companyTag(UPDATED_COMPANY_TAG)
            .companyTagValue(UPDATED_COMPANY_TAG_VALUE);

        restAceCompanyTagMockMvc.perform(put("/api/ace-company-tags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAceCompanyTag)))
            .andExpect(status().isOk());

        // Validate the AceCompanyTag in the database
        List<AceCompanyTag> aceCompanyTagList = aceCompanyTagRepository.findAll();
        assertThat(aceCompanyTagList).hasSize(databaseSizeBeforeUpdate);
        AceCompanyTag testAceCompanyTag = aceCompanyTagList.get(aceCompanyTagList.size() - 1);
        assertThat(testAceCompanyTag.getCompanyTag()).isEqualTo(UPDATED_COMPANY_TAG);
        assertThat(testAceCompanyTag.getCompanyTagValue()).isEqualTo(UPDATED_COMPANY_TAG_VALUE);
    }

    @Test
    @Transactional
    public void updateNonExistingAceCompanyTag() throws Exception {
        int databaseSizeBeforeUpdate = aceCompanyTagRepository.findAll().size();

        // Create the AceCompanyTag

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAceCompanyTagMockMvc.perform(put("/api/ace-company-tags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aceCompanyTag)))
            .andExpect(status().isCreated());

        // Validate the AceCompanyTag in the database
        List<AceCompanyTag> aceCompanyTagList = aceCompanyTagRepository.findAll();
        assertThat(aceCompanyTagList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAceCompanyTag() throws Exception {
        // Initialize the database
        aceCompanyTagRepository.saveAndFlush(aceCompanyTag);
        int databaseSizeBeforeDelete = aceCompanyTagRepository.findAll().size();

        // Get the aceCompanyTag
        restAceCompanyTagMockMvc.perform(delete("/api/ace-company-tags/{id}", aceCompanyTag.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AceCompanyTag> aceCompanyTagList = aceCompanyTagRepository.findAll();
        assertThat(aceCompanyTagList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AceCompanyTag.class);
        AceCompanyTag aceCompanyTag1 = new AceCompanyTag();
        aceCompanyTag1.setId(1L);
        AceCompanyTag aceCompanyTag2 = new AceCompanyTag();
        aceCompanyTag2.setId(aceCompanyTag1.getId());
        assertThat(aceCompanyTag1).isEqualTo(aceCompanyTag2);
        aceCompanyTag2.setId(2L);
        assertThat(aceCompanyTag1).isNotEqualTo(aceCompanyTag2);
        aceCompanyTag1.setId(null);
        assertThat(aceCompanyTag1).isNotEqualTo(aceCompanyTag2);
    }
}
