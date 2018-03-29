package com.dxc.fsg.bps.ace.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dxc.fsg.bps.ace.domain.BundleGroup;

import com.dxc.fsg.bps.ace.repository.BundleGroupRepository;
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
 * REST controller for managing BundleGroup.
 */
@RestController
@RequestMapping("/api")
public class BundleGroupResource {

    private final Logger log = LoggerFactory.getLogger(BundleGroupResource.class);

    private static final String ENTITY_NAME = "bundleGroup";

    private final BundleGroupRepository bundleGroupRepository;

    public BundleGroupResource(BundleGroupRepository bundleGroupRepository) {
        this.bundleGroupRepository = bundleGroupRepository;
    }

    /**
     * POST  /bundle-groups : Create a new bundleGroup.
     *
     * @param bundleGroup the bundleGroup to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bundleGroup, or with status 400 (Bad Request) if the bundleGroup has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/bundle-groups")
    @Timed
    public ResponseEntity<BundleGroup> createBundleGroup(@RequestBody BundleGroup bundleGroup) throws URISyntaxException {
        log.debug("REST request to save BundleGroup : {}", bundleGroup);
        if (bundleGroup.getId() != null) {
            throw new BadRequestAlertException("A new bundleGroup cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BundleGroup result = bundleGroupRepository.save(bundleGroup);
        return ResponseEntity.created(new URI("/api/bundle-groups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /bundle-groups : Updates an existing bundleGroup.
     *
     * @param bundleGroup the bundleGroup to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bundleGroup,
     * or with status 400 (Bad Request) if the bundleGroup is not valid,
     * or with status 500 (Internal Server Error) if the bundleGroup couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/bundle-groups")
    @Timed
    public ResponseEntity<BundleGroup> updateBundleGroup(@RequestBody BundleGroup bundleGroup) throws URISyntaxException {
        log.debug("REST request to update BundleGroup : {}", bundleGroup);
        if (bundleGroup.getId() == null) {
            return createBundleGroup(bundleGroup);
        }
        BundleGroup result = bundleGroupRepository.save(bundleGroup);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, bundleGroup.getId().toString()))
            .body(result);
    }

    /**
     * GET  /bundle-groups : get all the bundleGroups.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of bundleGroups in body
     */
    @GetMapping("/bundle-groups")
    @Timed
    public List<BundleGroup> getAllBundleGroups() {
        log.debug("REST request to get all BundleGroups");
        return bundleGroupRepository.findAllWithEagerRelationships();
        }

    /**
     * GET  /bundle-groups/:id : get the "id" bundleGroup.
     *
     * @param id the id of the bundleGroup to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bundleGroup, or with status 404 (Not Found)
     */
    @GetMapping("/bundle-groups/{id}")
    @Timed
    public ResponseEntity<BundleGroup> getBundleGroup(@PathVariable Long id) {
        log.debug("REST request to get BundleGroup : {}", id);
        BundleGroup bundleGroup = bundleGroupRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(bundleGroup));
    }

    /**
     * DELETE  /bundle-groups/:id : delete the "id" bundleGroup.
     *
     * @param id the id of the bundleGroup to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/bundle-groups/{id}")
    @Timed
    public ResponseEntity<Void> deleteBundleGroup(@PathVariable Long id) {
        log.debug("REST request to delete BundleGroup : {}", id);
        bundleGroupRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
