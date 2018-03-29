package com.dxc.fsg.bps.ace.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dxc.fsg.bps.ace.domain.Bundle;

import com.dxc.fsg.bps.ace.repository.BundleRepository;
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
 * REST controller for managing Bundle.
 */
@RestController
@RequestMapping("/api")
public class BundleResource {

    private final Logger log = LoggerFactory.getLogger(BundleResource.class);

    private static final String ENTITY_NAME = "bundle";

    private final BundleRepository bundleRepository;

    public BundleResource(BundleRepository bundleRepository) {
        this.bundleRepository = bundleRepository;
    }

    /**
     * POST  /bundles : Create a new bundle.
     *
     * @param bundle the bundle to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bundle, or with status 400 (Bad Request) if the bundle has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/bundles")
    @Timed
    public ResponseEntity<Bundle> createBundle(@Valid @RequestBody Bundle bundle) throws URISyntaxException {
        log.debug("REST request to save Bundle : {}", bundle);
        if (bundle.getId() != null) {
            throw new BadRequestAlertException("A new bundle cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Bundle result = bundleRepository.save(bundle);
        return ResponseEntity.created(new URI("/api/bundles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /bundles : Updates an existing bundle.
     *
     * @param bundle the bundle to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bundle,
     * or with status 400 (Bad Request) if the bundle is not valid,
     * or with status 500 (Internal Server Error) if the bundle couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/bundles")
    @Timed
    public ResponseEntity<Bundle> updateBundle(@Valid @RequestBody Bundle bundle) throws URISyntaxException {
        log.debug("REST request to update Bundle : {}", bundle);
        if (bundle.getId() == null) {
            return createBundle(bundle);
        }
        Bundle result = bundleRepository.save(bundle);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, bundle.getId().toString()))
            .body(result);
    }

    /**
     * GET  /bundles : get all the bundles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of bundles in body
     */
    @GetMapping("/bundles")
    @Timed
    public List<Bundle> getAllBundles() {
        log.debug("REST request to get all Bundles");
        return bundleRepository.findAll();
        }

    /**
     * GET  /bundles/:id : get the "id" bundle.
     *
     * @param id the id of the bundle to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bundle, or with status 404 (Not Found)
     */
    @GetMapping("/bundles/{id}")
    @Timed
    public ResponseEntity<Bundle> getBundle(@PathVariable Long id) {
        log.debug("REST request to get Bundle : {}", id);
        Bundle bundle = bundleRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(bundle));
    }

    /**
     * DELETE  /bundles/:id : delete the "id" bundle.
     *
     * @param id the id of the bundle to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/bundles/{id}")
    @Timed
    public ResponseEntity<Void> deleteBundle(@PathVariable Long id) {
        log.debug("REST request to delete Bundle : {}", id);
        bundleRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
