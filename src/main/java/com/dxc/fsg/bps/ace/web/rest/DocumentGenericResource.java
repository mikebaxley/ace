package com.dxc.fsg.bps.ace.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dxc.fsg.bps.ace.domain.DocumentGeneric;

import com.dxc.fsg.bps.ace.repository.DocumentGenericRepository;
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
 * REST controller for managing DocumentGeneric.
 */
@RestController
@RequestMapping("/api")
public class DocumentGenericResource {

    private final Logger log = LoggerFactory.getLogger(DocumentGenericResource.class);

    private static final String ENTITY_NAME = "documentGeneric";

    private final DocumentGenericRepository documentGenericRepository;

    public DocumentGenericResource(DocumentGenericRepository documentGenericRepository) {
        this.documentGenericRepository = documentGenericRepository;
    }

    /**
     * POST  /document-generics : Create a new documentGeneric.
     *
     * @param documentGeneric the documentGeneric to create
     * @return the ResponseEntity with status 201 (Created) and with body the new documentGeneric, or with status 400 (Bad Request) if the documentGeneric has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/document-generics")
    @Timed
    public ResponseEntity<DocumentGeneric> createDocumentGeneric(@RequestBody DocumentGeneric documentGeneric) throws URISyntaxException {
        log.debug("REST request to save DocumentGeneric : {}", documentGeneric);
        if (documentGeneric.getId() != null) {
            throw new BadRequestAlertException("A new documentGeneric cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DocumentGeneric result = documentGenericRepository.save(documentGeneric);
        return ResponseEntity.created(new URI("/api/document-generics/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /document-generics : Updates an existing documentGeneric.
     *
     * @param documentGeneric the documentGeneric to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated documentGeneric,
     * or with status 400 (Bad Request) if the documentGeneric is not valid,
     * or with status 500 (Internal Server Error) if the documentGeneric couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/document-generics")
    @Timed
    public ResponseEntity<DocumentGeneric> updateDocumentGeneric(@RequestBody DocumentGeneric documentGeneric) throws URISyntaxException {
        log.debug("REST request to update DocumentGeneric : {}", documentGeneric);
        if (documentGeneric.getId() == null) {
            return createDocumentGeneric(documentGeneric);
        }
        DocumentGeneric result = documentGenericRepository.save(documentGeneric);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, documentGeneric.getId().toString()))
            .body(result);
    }

    /**
     * GET  /document-generics : get all the documentGenerics.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of documentGenerics in body
     */
    @GetMapping("/document-generics")
    @Timed
    public List<DocumentGeneric> getAllDocumentGenerics() {
        log.debug("REST request to get all DocumentGenerics");
        return documentGenericRepository.findAllWithEagerRelationships();
        }

    /**
     * GET  /document-generics/:id : get the "id" documentGeneric.
     *
     * @param id the id of the documentGeneric to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the documentGeneric, or with status 404 (Not Found)
     */
    @GetMapping("/document-generics/{id}")
    @Timed
    public ResponseEntity<DocumentGeneric> getDocumentGeneric(@PathVariable Long id) {
        log.debug("REST request to get DocumentGeneric : {}", id);
        DocumentGeneric documentGeneric = documentGenericRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(documentGeneric));
    }

    /**
     * DELETE  /document-generics/:id : delete the "id" documentGeneric.
     *
     * @param id the id of the documentGeneric to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/document-generics/{id}")
    @Timed
    public ResponseEntity<Void> deleteDocumentGeneric(@PathVariable Long id) {
        log.debug("REST request to delete DocumentGeneric : {}", id);
        documentGenericRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
