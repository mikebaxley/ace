package com.dxc.fsg.bps.ace.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dxc.fsg.bps.ace.domain.PrintManagement;

import com.dxc.fsg.bps.ace.repository.PrintManagementRepository;
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
 * REST controller for managing PrintManagement.
 */
@RestController
@RequestMapping("/api")
public class PrintManagementResource {

    private final Logger log = LoggerFactory.getLogger(PrintManagementResource.class);

    private static final String ENTITY_NAME = "printManagement";

    private final PrintManagementRepository printManagementRepository;

    public PrintManagementResource(PrintManagementRepository printManagementRepository) {
        this.printManagementRepository = printManagementRepository;
    }

    /**
     * POST  /print-managements : Create a new printManagement.
     *
     * @param printManagement the printManagement to create
     * @return the ResponseEntity with status 201 (Created) and with body the new printManagement, or with status 400 (Bad Request) if the printManagement has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/print-managements")
    @Timed
    public ResponseEntity<PrintManagement> createPrintManagement(@RequestBody PrintManagement printManagement) throws URISyntaxException {
        log.debug("REST request to save PrintManagement : {}", printManagement);
        if (printManagement.getId() != null) {
            throw new BadRequestAlertException("A new printManagement cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PrintManagement result = printManagementRepository.save(printManagement);
        return ResponseEntity.created(new URI("/api/print-managements/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /print-managements : Updates an existing printManagement.
     *
     * @param printManagement the printManagement to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated printManagement,
     * or with status 400 (Bad Request) if the printManagement is not valid,
     * or with status 500 (Internal Server Error) if the printManagement couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/print-managements")
    @Timed
    public ResponseEntity<PrintManagement> updatePrintManagement(@RequestBody PrintManagement printManagement) throws URISyntaxException {
        log.debug("REST request to update PrintManagement : {}", printManagement);
        if (printManagement.getId() == null) {
            return createPrintManagement(printManagement);
        }
        PrintManagement result = printManagementRepository.save(printManagement);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, printManagement.getId().toString()))
            .body(result);
    }

    /**
     * GET  /print-managements : get all the printManagements.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of printManagements in body
     */
    @GetMapping("/print-managements")
    @Timed
    public List<PrintManagement> getAllPrintManagements() {
        log.debug("REST request to get all PrintManagements");
        return printManagementRepository.findAll();
        }

    /**
     * GET  /print-managements/:id : get the "id" printManagement.
     *
     * @param id the id of the printManagement to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the printManagement, or with status 404 (Not Found)
     */
    @GetMapping("/print-managements/{id}")
    @Timed
    public ResponseEntity<PrintManagement> getPrintManagement(@PathVariable Long id) {
        log.debug("REST request to get PrintManagement : {}", id);
        PrintManagement printManagement = printManagementRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(printManagement));
    }

    /**
     * DELETE  /print-managements/:id : delete the "id" printManagement.
     *
     * @param id the id of the printManagement to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/print-managements/{id}")
    @Timed
    public ResponseEntity<Void> deletePrintManagement(@PathVariable Long id) {
        log.debug("REST request to delete PrintManagement : {}", id);
        printManagementRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
