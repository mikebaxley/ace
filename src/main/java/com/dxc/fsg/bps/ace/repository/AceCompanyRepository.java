package com.dxc.fsg.bps.ace.repository;

import com.dxc.fsg.bps.ace.domain.AceCompany;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the AceCompany entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AceCompanyRepository extends JpaRepository<AceCompany, Long> {

}
