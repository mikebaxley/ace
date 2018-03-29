package com.dxc.fsg.bps.ace.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dxc.fsg.bps.ace.domain.TemplateParameters;

import com.dxc.fsg.bps.ace.repository.TemplateParametersRepository;
import com.dxc.fsg.bps.ace.web.rest.errors.BadRequestAlertException;
import com.dxc.fsg.bps.ace.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TemplateParameters.
 */
@RestController
@RequestMapping("/api")
public class TemplateParametersResource {

    private final Logger log = LoggerFactory.getLogger(TemplateParametersResource.class);

    private static final String ENTITY_NAME = "templateParameters";

    private final TemplateParametersRepository templateParametersRepository;

    public TemplateParametersResource(TemplateParametersRepository templateParametersRepository) {
        this.templateParametersRepository = templateParametersRepository;
    }

    /**
     * POST  /template-parameters : Create a new templateParameters.
     *
     * @param templateParameters the templateParameters to create
     * @return the ResponseEntity with status 201 (Created) and with body the new templateParameters, or with status 400 (Bad Request) if the templateParameters has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/template-parameters")
    @Timed
    public ResponseEntity<TemplateParameters> createTemplateParameters(@RequestBody TemplateParameters templateParameters) throws URISyntaxException {
        log.debug("REST request to save TemplateParameters : {}", templateParameters);
        if (templateParameters.getId() != null) {
            throw new BadRequestAlertException("A new templateParameters cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TemplateParameters result = templateParametersRepository.save(templateParameters);
        return ResponseEntity.created(new URI("/api/template-parameters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /template-parameters : Updates an existing templateParameters.
     *
     * @param templateParameters the templateParameters to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated templateParameters,
     * or with status 400 (Bad Request) if the templateParameters is not valid,
     * or with status 500 (Internal Server Error) if the templateParameters couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/template-parameters")
    @Timed
    public ResponseEntity<TemplateParameters> updateTemplateParameters(@RequestBody TemplateParameters templateParameters) throws URISyntaxException {
        log.debug("REST request to update TemplateParameters : {}", templateParameters);
        if (templateParameters.getId() == null) {
            return createTemplateParameters(templateParameters);
        }
        TemplateParameters result = templateParametersRepository.save(templateParameters);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, templateParameters.getId().toString()))
            .body(result);
    }

    /**
     * GET  /template-parameters : get all the templateParameters.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of templateParameters in body
     */
    @GetMapping("/template-parameters")
    @Timed
    public List<TemplateParameters> getAllTemplateParameters() {
        log.debug("REST request to get all TemplateParameters");
        return templateParametersRepository.findAll();
        }

    /**
     * GET  /template-parameters/:id : get the "id" templateParameters.
     *
     * @param id the id of the templateParameters to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the templateParameters, or with status 404 (Not Found)
     */
    @GetMapping("/template-parameters/{id}")
    @Timed
    public ResponseEntity<TemplateParameters> getTemplateParameters(@PathVariable Long id) {
        log.debug("REST request to get TemplateParameters : {}", id);
        TemplateParameters templateParameters = templateParametersRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(templateParameters));
    }

    /**
     * DELETE  /template-parameters/:id : delete the "id" templateParameters.
     *
     * @param id the id of the templateParameters to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/template-parameters/{id}")
    @Timed
    public ResponseEntity<Void> deleteTemplateParameters(@PathVariable Long id) {
        log.debug("REST request to delete TemplateParameters : {}", id);
        templateParametersRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
