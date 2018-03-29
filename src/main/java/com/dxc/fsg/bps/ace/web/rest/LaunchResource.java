package com.dxc.fsg.bps.ace.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dxc.fsg.bps.ace.domain.Launch;

import com.dxc.fsg.bps.ace.repository.LaunchRepository;
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
 * REST controller for managing Launch.
 */
@RestController
@RequestMapping("/api")
public class LaunchResource {

    private final Logger log = LoggerFactory.getLogger(LaunchResource.class);

    private static final String ENTITY_NAME = "launch";

    private final LaunchRepository launchRepository;

    public LaunchResource(LaunchRepository launchRepository) {
        this.launchRepository = launchRepository;
    }

    /**
     * POST  /launches : Create a new launch.
     *
     * @param launch the launch to create
     * @return the ResponseEntity with status 201 (Created) and with body the new launch, or with status 400 (Bad Request) if the launch has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/launches")
    @Timed
    public ResponseEntity<Launch> createLaunch(@RequestBody Launch launch) throws URISyntaxException {
        log.debug("REST request to save Launch : {}", launch);
        if (launch.getId() != null) {
            throw new BadRequestAlertException("A new launch cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Launch result = launchRepository.save(launch);
        return ResponseEntity.created(new URI("/api/launches/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /launches : Updates an existing launch.
     *
     * @param launch the launch to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated launch,
     * or with status 400 (Bad Request) if the launch is not valid,
     * or with status 500 (Internal Server Error) if the launch couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/launches")
    @Timed
    public ResponseEntity<Launch> updateLaunch(@RequestBody Launch launch) throws URISyntaxException {
        log.debug("REST request to update Launch : {}", launch);
        if (launch.getId() == null) {
            return createLaunch(launch);
        }
        Launch result = launchRepository.save(launch);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, launch.getId().toString()))
            .body(result);
    }

    /**
     * GET  /launches : get all the launches.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of launches in body
     */
    @GetMapping("/launches")
    @Timed
    public List<Launch> getAllLaunches() {
        log.debug("REST request to get all Launches");
        return launchRepository.findAll();
        }

    /**
     * GET  /launches/:id : get the "id" launch.
     *
     * @param id the id of the launch to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the launch, or with status 404 (Not Found)
     */
    @GetMapping("/launches/{id}")
    @Timed
    public ResponseEntity<Launch> getLaunch(@PathVariable Long id) {
        log.debug("REST request to get Launch : {}", id);
        Launch launch = launchRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(launch));
    }

    /**
     * DELETE  /launches/:id : delete the "id" launch.
     *
     * @param id the id of the launch to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/launches/{id}")
    @Timed
    public ResponseEntity<Void> deleteLaunch(@PathVariable Long id) {
        log.debug("REST request to delete Launch : {}", id);
        launchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
