package com.dxc.fsg.bps.ace.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dxc.fsg.bps.ace.domain.BundleToDocument;

import com.dxc.fsg.bps.ace.repository.BundleToDocumentRepository;
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
 * REST controller for managing BundleToDocument.
 */
@RestController
@RequestMapping("/api")
public class BundleToDocumentResource {

    private final Logger log = LoggerFactory.getLogger(BundleToDocumentResource.class);

    private static final String ENTITY_NAME = "bundleToDocument";

    private final BundleToDocumentRepository bundleToDocumentRepository;

    public BundleToDocumentResource(BundleToDocumentRepository bundleToDocumentRepository) {
        this.bundleToDocumentRepository = bundleToDocumentRepository;
    }

    /**
     * POST  /bundle-to-documents : Create a new bundleToDocument.
     *
     * @param bundleToDocument the bundleToDocument to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bundleToDocument, or with status 400 (Bad Request) if the bundleToDocument has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/bundle-to-documents")
    @Timed
    public ResponseEntity<BundleToDocument> createBundleToDocument(@RequestBody BundleToDocument bundleToDocument) throws URISyntaxException {
        log.debug("REST request to save BundleToDocument : {}", bundleToDocument);
        if (bundleToDocument.getId() != null) {
            throw new BadRequestAlertException("A new bundleToDocument cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BundleToDocument result = bundleToDocumentRepository.save(bundleToDocument);
        return ResponseEntity.created(new URI("/api/bundle-to-documents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /bundle-to-documents : Updates an existing bundleToDocument.
     *
     * @param bundleToDocument the bundleToDocument to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bundleToDocument,
     * or with status 400 (Bad Request) if the bundleToDocument is not valid,
     * or with status 500 (Internal Server Error) if the bundleToDocument couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/bundle-to-documents")
    @Timed
    public ResponseEntity<BundleToDocument> updateBundleToDocument(@RequestBody BundleToDocument bundleToDocument) throws URISyntaxException {
        log.debug("REST request to update BundleToDocument : {}", bundleToDocument);
        if (bundleToDocument.getId() == null) {
            return createBundleToDocument(bundleToDocument);
        }
        BundleToDocument result = bundleToDocumentRepository.save(bundleToDocument);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, bundleToDocument.getId().toString()))
            .body(result);
    }

    /**
     * GET  /bundle-to-documents : get all the bundleToDocuments.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of bundleToDocuments in body
     */
    @GetMapping("/bundle-to-documents")
    @Timed
    public List<BundleToDocument> getAllBundleToDocuments() {
        log.debug("REST request to get all BundleToDocuments");
        return bundleToDocumentRepository.findAll();
        }

    /**
     * GET  /bundle-to-documents/:id : get the "id" bundleToDocument.
     *
     * @param id the id of the bundleToDocument to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bundleToDocument, or with status 404 (Not Found)
     */
    @GetMapping("/bundle-to-documents/{id}")
    @Timed
    public ResponseEntity<BundleToDocument> getBundleToDocument(@PathVariable Long id) {
        log.debug("REST request to get BundleToDocument : {}", id);
        BundleToDocument bundleToDocument = bundleToDocumentRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(bundleToDocument));
    }

    /**
     * DELETE  /bundle-to-documents/:id : delete the "id" bundleToDocument.
     *
     * @param id the id of the bundleToDocument to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/bundle-to-documents/{id}")
    @Timed
    public ResponseEntity<Void> deleteBundleToDocument(@PathVariable Long id) {
        log.debug("REST request to delete BundleToDocument : {}", id);
        bundleToDocumentRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
