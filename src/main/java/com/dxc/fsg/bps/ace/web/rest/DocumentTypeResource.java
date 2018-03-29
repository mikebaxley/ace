package com.dxc.fsg.bps.ace.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dxc.fsg.bps.ace.domain.DocumentType;

import com.dxc.fsg.bps.ace.repository.DocumentTypeRepository;
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
 * REST controller for managing DocumentType.
 */
@RestController
@RequestMapping("/api")
public class DocumentTypeResource {

    private final Logger log = LoggerFactory.getLogger(DocumentTypeResource.class);

    private static final String ENTITY_NAME = "documentType";

    private final DocumentTypeRepository documentTypeRepository;

    public DocumentTypeResource(DocumentTypeRepository documentTypeRepository) {
        this.documentTypeRepository = documentTypeRepository;
    }

    /**
     * POST  /document-types : Create a new documentType.
     *
     * @param documentType the documentType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new documentType, or with status 400 (Bad Request) if the documentType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/document-types")
    @Timed
    public ResponseEntity<DocumentType> createDocumentType(@RequestBody DocumentType documentType) throws URISyntaxException {
        log.debug("REST request to save DocumentType : {}", documentType);
        if (documentType.getId() != null) {
            throw new BadRequestAlertException("A new documentType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DocumentType result = documentTypeRepository.save(documentType);
        return ResponseEntity.created(new URI("/api/document-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /document-types : Updates an existing documentType.
     *
     * @param documentType the documentType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated documentType,
     * or with status 400 (Bad Request) if the documentType is not valid,
     * or with status 500 (Internal Server Error) if the documentType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/document-types")
    @Timed
    public ResponseEntity<DocumentType> updateDocumentType(@RequestBody DocumentType documentType) throws URISyntaxException {
        log.debug("REST request to update DocumentType : {}", documentType);
        if (documentType.getId() == null) {
            return createDocumentType(documentType);
        }
        DocumentType result = documentTypeRepository.save(documentType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, documentType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /document-types : get all the documentTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of documentTypes in body
     */
    @GetMapping("/document-types")
    @Timed
    public List<DocumentType> getAllDocumentTypes() {
        log.debug("REST request to get all DocumentTypes");
        return documentTypeRepository.findAll();
        }

    /**
     * GET  /document-types/:id : get the "id" documentType.
     *
     * @param id the id of the documentType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the documentType, or with status 404 (Not Found)
     */
    @GetMapping("/document-types/{id}")
    @Timed
    public ResponseEntity<DocumentType> getDocumentType(@PathVariable Long id) {
        log.debug("REST request to get DocumentType : {}", id);
        DocumentType documentType = documentTypeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(documentType));
    }

    /**
     * DELETE  /document-types/:id : delete the "id" documentType.
     *
     * @param id the id of the documentType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/document-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteDocumentType(@PathVariable Long id) {
        log.debug("REST request to delete DocumentType : {}", id);
        documentTypeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
