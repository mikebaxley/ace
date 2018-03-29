package com.dxc.fsg.bps.ace.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dxc.fsg.bps.ace.domain.AceCompanyTag;

import com.dxc.fsg.bps.ace.repository.AceCompanyTagRepository;
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
 * REST controller for managing AceCompanyTag.
 */
@RestController
@RequestMapping("/api")
public class AceCompanyTagResource {

    private final Logger log = LoggerFactory.getLogger(AceCompanyTagResource.class);

    private static final String ENTITY_NAME = "aceCompanyTag";

    private final AceCompanyTagRepository aceCompanyTagRepository;

    public AceCompanyTagResource(AceCompanyTagRepository aceCompanyTagRepository) {
        this.aceCompanyTagRepository = aceCompanyTagRepository;
    }

    /**
     * POST  /ace-company-tags : Create a new aceCompanyTag.
     *
     * @param aceCompanyTag the aceCompanyTag to create
     * @return the ResponseEntity with status 201 (Created) and with body the new aceCompanyTag, or with status 400 (Bad Request) if the aceCompanyTag has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ace-company-tags")
    @Timed
    public ResponseEntity<AceCompanyTag> createAceCompanyTag(@RequestBody AceCompanyTag aceCompanyTag) throws URISyntaxException {
        log.debug("REST request to save AceCompanyTag : {}", aceCompanyTag);
        if (aceCompanyTag.getId() != null) {
            throw new BadRequestAlertException("A new aceCompanyTag cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AceCompanyTag result = aceCompanyTagRepository.save(aceCompanyTag);
        return ResponseEntity.created(new URI("/api/ace-company-tags/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ace-company-tags : Updates an existing aceCompanyTag.
     *
     * @param aceCompanyTag the aceCompanyTag to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated aceCompanyTag,
     * or with status 400 (Bad Request) if the aceCompanyTag is not valid,
     * or with status 500 (Internal Server Error) if the aceCompanyTag couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ace-company-tags")
    @Timed
    public ResponseEntity<AceCompanyTag> updateAceCompanyTag(@RequestBody AceCompanyTag aceCompanyTag) throws URISyntaxException {
        log.debug("REST request to update AceCompanyTag : {}", aceCompanyTag);
        if (aceCompanyTag.getId() == null) {
            return createAceCompanyTag(aceCompanyTag);
        }
        AceCompanyTag result = aceCompanyTagRepository.save(aceCompanyTag);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, aceCompanyTag.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ace-company-tags : get all the aceCompanyTags.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of aceCompanyTags in body
     */
    @GetMapping("/ace-company-tags")
    @Timed
    public List<AceCompanyTag> getAllAceCompanyTags() {
        log.debug("REST request to get all AceCompanyTags");
        return aceCompanyTagRepository.findAll();
        }

    /**
     * GET  /ace-company-tags/:id : get the "id" aceCompanyTag.
     *
     * @param id the id of the aceCompanyTag to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the aceCompanyTag, or with status 404 (Not Found)
     */
    @GetMapping("/ace-company-tags/{id}")
    @Timed
    public ResponseEntity<AceCompanyTag> getAceCompanyTag(@PathVariable Long id) {
        log.debug("REST request to get AceCompanyTag : {}", id);
        AceCompanyTag aceCompanyTag = aceCompanyTagRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(aceCompanyTag));
    }

    /**
     * DELETE  /ace-company-tags/:id : delete the "id" aceCompanyTag.
     *
     * @param id the id of the aceCompanyTag to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ace-company-tags/{id}")
    @Timed
    public ResponseEntity<Void> deleteAceCompanyTag(@PathVariable Long id) {
        log.debug("REST request to delete AceCompanyTag : {}", id);
        aceCompanyTagRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
