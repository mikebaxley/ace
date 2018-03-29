package com.dxc.fsg.bps.ace.repository;

import com.dxc.fsg.bps.ace.domain.AceCompanyTag;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the AceCompanyTag entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AceCompanyTagRepository extends JpaRepository<AceCompanyTag, Long> {

}
