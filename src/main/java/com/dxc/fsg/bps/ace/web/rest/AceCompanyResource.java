package com.dxc.fsg.bps.ace.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dxc.fsg.bps.ace.domain.AceCompany;

import com.dxc.fsg.bps.ace.repository.AceCompanyRepository;
import com.dxc.fsg.bps.ace.web.rest.errors.BadRequestAlertException;
import com.dxc.fsg.bps.ace.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing AceCompany.
 */
@RestController
@RequestMapping("/api")
public class AceCompanyResource {

    private final Logger log = LoggerFactory.getLogger(AceCompanyResource.class);

    private static final String ENTITY_NAME = "aceCompany";

    private final AceCompanyRepository aceCompanyRepository;

    public AceCompanyResource(AceCompanyRepository aceCompanyRepository) {
        this.aceCompanyRepository = aceCompanyRepository;
    }

    /**
     * POST  /ace-companies : Create a new aceCompany.
     *
     * @param aceCompany the aceCompany to create
     * @return the ResponseEntity with status 201 (Created) and with body the new aceCompany, or with status 400 (Bad Request) if the aceCompany has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ace-companies")
    @Timed
    public ResponseEntity<AceCompany> createAceCompany(@Valid @RequestBody AceCompany aceCompany) throws URISyntaxException {
        log.debug("REST request to save AceCompany : {}", aceCompany);
        if (aceCompany.getId() != null) {
            throw new BadRequestAlertException("A new aceCompany cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AceCompany result = aceCompanyRepository.save(aceCompany);
        return ResponseEntity.created(new URI("/api/ace-companies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ace-companies : Updates an existing aceCompany.
     *
     * @param aceCompany the aceCompany to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated aceCompany,
     * or with status 400 (Bad Request) if the aceCompany is not valid,
     * or with status 500 (Internal Server Error) if the aceCompany couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ace-companies")
    @Timed
    public ResponseEntity<AceCompany> updateAceCompany(@Valid @RequestBody AceCompany aceCompany) throws URISyntaxException {
        log.debug("REST request to update AceCompany : {}", aceCompany);
        if (aceCompany.getId() == null) {
            return createAceCompany(aceCompany);
        }
        AceCompany result = aceCompanyRepository.save(aceCompany);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, aceCompany.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ace-companies : get all the aceCompanies.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of aceCompanies in body
     */
    @GetMapping("/ace-companies")
    @Timed
    public List<AceCompany> getAllAceCompanies() {
        log.debug("REST request to get all AceCompanies");
        return aceCompanyRepository.findAll();
        }

    /**
     * GET  /ace-companies/:id : get the "id" aceCompany.
     *
     * @param id the id of the aceCompany to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the aceCompany, or with status 404 (Not Found)
     */
    @GetMapping("/ace-companies/{id}")
    @Timed
    public ResponseEntity<AceCompany> getAceCompany(@PathVariable Long id) {
        log.debug("REST request to get AceCompany : {}", id);
        AceCompany aceCompany = aceCompanyRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(aceCompany));
    }

    /**
     * DELETE  /ace-companies/:id : delete the "id" aceCompany.
     *
     * @param id the id of the aceCompany to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ace-companies/{id}")
    @Timed
    public ResponseEntity<Void> deleteAceCompany(@PathVariable Long id) {
        log.debug("REST request to delete AceCompany : {}", id);
        aceCompanyRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
