package com.dxc.fsg.bps.ace.repository;

import com.dxc.fsg.bps.ace.domain.WebServiceRequestAudit;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the WebServiceRequestAudit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WebServiceRequestAuditRepository extends JpaRepository<WebServiceRequestAudit, Long> {

}
