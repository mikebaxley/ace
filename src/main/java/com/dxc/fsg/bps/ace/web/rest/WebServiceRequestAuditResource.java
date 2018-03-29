package com.dxc.fsg.bps.ace.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dxc.fsg.bps.ace.domain.WebServiceRequestAudit;

import com.dxc.fsg.bps.ace.repository.WebServiceRequestAuditRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing WebServiceRequestAudit.
 */
@RestController
@RequestMapping("/api")
public class WebServiceRequestAuditResource {

    private final Logger log = LoggerFactory.getLogger(WebServiceRequestAuditResource.class);

    private static final String ENTITY_NAME = "webServiceRequestAudit";

    private final WebServiceRequestAuditRepository webServiceRequestAuditRepository;

    public WebServiceRequestAuditResource(WebServiceRequestAuditRepository webServiceRequestAuditRepository) {
        this.webServiceRequestAuditRepository = webServiceRequestAuditRepository;
    }

    /**
     * POST  /web-service-request-audits : Create a new webServiceRequestAudit.
     *
     * @param webServiceRequestAudit the webServiceRequestAudit to create
     * @return the ResponseEntity with status 201 (Created) and with body the new webServiceRequestAudit, or with status 400 (Bad Request) if the webServiceRequestAudit has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/web-service-request-audits")
    @Timed
    public ResponseEntity<WebServiceRequestAudit> createWebServiceRequestAudit(@RequestBody WebServiceRequestAudit webServiceRequestAudit) throws URISyntaxException {
        log.debug("REST request to save WebServiceRequestAudit : {}", webServiceRequestAudit);
        if (webServiceRequestAudit.getId() != null) {
            throw new BadRequestAlertException("A new webServiceRequestAudit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WebServiceRequestAudit result = webServiceRequestAuditRepository.save(webServiceRequestAudit);
        return ResponseEntity.created(new URI("/api/web-service-request-audits/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /web-service-request-audits : Updates an existing webServiceRequestAudit.
     *
     * @param webServiceRequestAudit the webServiceRequestAudit to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated webServiceRequestAudit,
     * or with status 400 (Bad Request) if the webServiceRequestAudit is not valid,
     * or with status 500 (Internal Server Error) if the webServiceRequestAudit couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/web-service-request-audits")
    @Timed
    public ResponseEntity<WebServiceRequestAudit> updateWebServiceRequestAudit(@RequestBody WebServiceRequestAudit webServiceRequestAudit) throws URISyntaxException {
        log.debug("REST request to update WebServiceRequestAudit : {}", webServiceRequestAudit);
        if (webServiceRequestAudit.getId() == null) {
            return createWebServiceRequestAudit(webServiceRequestAudit);
        }
        WebServiceRequestAudit result = webServiceRequestAuditRepository.save(webServiceRequestAudit);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, webServiceRequestAudit.getId().toString()))
            .body(result);
    }

    /**
     * GET  /web-service-request-audits : get all the webServiceRequestAudits.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of webServiceRequestAudits in body
     */
    @GetMapping("/web-service-request-audits")
    @Timed
    public List<WebServiceRequestAudit> getAllWebServiceRequestAudits(@RequestParam(required = false) String filter) {
        if ("printmanagement-is-null".equals(filter)) {
            log.debug("REST request to get all WebServiceRequestAudits where printManagement is null");
            return StreamSupport
                .stream(webServiceRequestAuditRepository.findAll().spliterator(), false)
                .filter(webServiceRequestAudit -> webServiceRequestAudit.getPrintManagement() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all WebServiceRequestAudits");
        return webServiceRequestAuditRepository.findAll();
        }

    /**
     * GET  /web-service-request-audits/:id : get the "id" webServiceRequestAudit.
     *
     * @param id the id of the webServiceRequestAudit to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the webServiceRequestAudit, or with status 404 (Not Found)
     */
    @GetMapping("/web-service-request-audits/{id}")
    @Timed
    public ResponseEntity<WebServiceRequestAudit> getWebServiceRequestAudit(@PathVariable Long id) {
        log.debug("REST request to get WebServiceRequestAudit : {}", id);
        WebServiceRequestAudit webServiceRequestAudit = webServiceRequestAuditRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(webServiceRequestAudit));
    }

    /**
     * DELETE  /web-service-request-audits/:id : delete the "id" webServiceRequestAudit.
     *
     * @param id the id of the webServiceRequestAudit to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/web-service-request-audits/{id}")
    @Timed
    public ResponseEntity<Void> deleteWebServiceRequestAudit(@PathVariable Long id) {
        log.debug("REST request to delete WebServiceRequestAudit : {}", id);
        webServiceRequestAuditRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
