package com.dxc.fsg.bps.ace.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dxc.fsg.bps.ace.domain.DocumentState;

import com.dxc.fsg.bps.ace.repository.DocumentStateRepository;
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
 * REST controller for managing DocumentState.
 */
@RestController
@RequestMapping("/api")
public class DocumentStateResource {

    private final Logger log = LoggerFactory.getLogger(DocumentStateResource.class);

    private static final String ENTITY_NAME = "documentState";

    private final DocumentStateRepository documentStateRepository;

    public DocumentStateResource(DocumentStateRepository documentStateRepository) {
        this.documentStateRepository = documentStateRepository;
    }

    /**
     * POST  /document-states : Create a new documentState.
     *
     * @param documentState the documentState to create
     * @return the ResponseEntity with status 201 (Created) and with body the new documentState, or with status 400 (Bad Request) if the documentState has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/document-states")
    @Timed
    public ResponseEntity<DocumentState> createDocumentState(@Valid @RequestBody DocumentState documentState) throws URISyntaxException {
        log.debug("REST request to save DocumentState : {}", documentState);
        if (documentState.getId() != null) {
            throw new BadRequestAlertException("A new documentState cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DocumentState result = documentStateRepository.save(documentState);
        return ResponseEntity.created(new URI("/api/document-states/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /document-states : Updates an existing documentState.
     *
     * @param documentState the documentState to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated documentState,
     * or with status 400 (Bad Request) if the documentState is not valid,
     * or with status 500 (Internal Server Error) if the documentState couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/document-states")
    @Timed
    public ResponseEntity<DocumentState> updateDocumentState(@Valid @RequestBody DocumentState documentState) throws URISyntaxException {
        log.debug("REST request to update DocumentState : {}", documentState);
        if (documentState.getId() == null) {
            return createDocumentState(documentState);
        }
        DocumentState result = documentStateRepository.save(documentState);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, documentState.getId().toString()))
            .body(result);
    }

    /**
     * GET  /document-states : get all the documentStates.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of documentStates in body
     */
    @GetMapping("/document-states")
    @Timed
    public List<DocumentState> getAllDocumentStates() {
        log.debug("REST request to get all DocumentStates");
        return documentStateRepository.findAll();
        }

    /**
     * GET  /document-states/:id : get the "id" documentState.
     *
     * @param id the id of the documentState to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the documentState, or with status 404 (Not Found)
     */
    @GetMapping("/document-states/{id}")
    @Timed
    public ResponseEntity<DocumentState> getDocumentState(@PathVariable Long id) {
        log.debug("REST request to get DocumentState : {}", id);
        DocumentState documentState = documentStateRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(documentState));
    }

    /**
     * DELETE  /document-states/:id : delete the "id" documentState.
     *
     * @param id the id of the documentState to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/document-states/{id}")
    @Timed
    public ResponseEntity<Void> deleteDocumentState(@PathVariable Long id) {
        log.debug("REST request to delete DocumentState : {}", id);
        documentStateRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
