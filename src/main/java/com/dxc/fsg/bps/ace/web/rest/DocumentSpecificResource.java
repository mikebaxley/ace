package com.dxc.fsg.bps.ace.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dxc.fsg.bps.ace.domain.DocumentSpecific;

import com.dxc.fsg.bps.ace.repository.DocumentSpecificRepository;
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
 * REST controller for managing DocumentSpecific.
 */
@RestController
@RequestMapping("/api")
public class DocumentSpecificResource {

    private final Logger log = LoggerFactory.getLogger(DocumentSpecificResource.class);

    private static final String ENTITY_NAME = "documentSpecific";

    private final DocumentSpecificRepository documentSpecificRepository;

    public DocumentSpecificResource(DocumentSpecificRepository documentSpecificRepository) {
        this.documentSpecificRepository = documentSpecificRepository;
    }

    /**
     * POST  /document-specifics : Create a new documentSpecific.
     *
     * @param documentSpecific the documentSpecific to create
     * @return the ResponseEntity with status 201 (Created) and with body the new documentSpecific, or with status 400 (Bad Request) if the documentSpecific has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/document-specifics")
    @Timed
    public ResponseEntity<DocumentSpecific> createDocumentSpecific(@RequestBody DocumentSpecific documentSpecific) throws URISyntaxException {
        log.debug("REST request to save DocumentSpecific : {}", documentSpecific);
        if (documentSpecific.getId() != null) {
            throw new BadRequestAlertException("A new documentSpecific cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DocumentSpecific result = documentSpecificRepository.save(documentSpecific);
        return ResponseEntity.created(new URI("/api/document-specifics/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /document-specifics : Updates an existing documentSpecific.
     *
     * @param documentSpecific the documentSpecific to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated documentSpecific,
     * or with status 400 (Bad Request) if the documentSpecific is not valid,
     * or with status 500 (Internal Server Error) if the documentSpecific couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/document-specifics")
    @Timed
    public ResponseEntity<DocumentSpecific> updateDocumentSpecific(@RequestBody DocumentSpecific documentSpecific) throws URISyntaxException {
        log.debug("REST request to update DocumentSpecific : {}", documentSpecific);
        if (documentSpecific.getId() == null) {
            return createDocumentSpecific(documentSpecific);
        }
        DocumentSpecific result = documentSpecificRepository.save(documentSpecific);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, documentSpecific.getId().toString()))
            .body(result);
    }

    /**
     * GET  /document-specifics : get all the documentSpecifics.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of documentSpecifics in body
     */
    @GetMapping("/document-specifics")
    @Timed
    public List<DocumentSpecific> getAllDocumentSpecifics() {
        log.debug("REST request to get all DocumentSpecifics");
        return documentSpecificRepository.findAllWithEagerRelationships();
        }

    /**
     * GET  /document-specifics/:id : get the "id" documentSpecific.
     *
     * @param id the id of the documentSpecific to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the documentSpecific, or with status 404 (Not Found)
     */
    @GetMapping("/document-specifics/{id}")
    @Timed
    public ResponseEntity<DocumentSpecific> getDocumentSpecific(@PathVariable Long id) {
        log.debug("REST request to get DocumentSpecific : {}", id);
        DocumentSpecific documentSpecific = documentSpecificRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(documentSpecific));
    }

    /**
     * DELETE  /document-specifics/:id : delete the "id" documentSpecific.
     *
     * @param id the id of the documentSpecific to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/document-specifics/{id}")
    @Timed
    public ResponseEntity<Void> deleteDocumentSpecific(@PathVariable Long id) {
        log.debug("REST request to delete DocumentSpecific : {}", id);
        documentSpecificRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
