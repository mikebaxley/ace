package com.dxc.fsg.bps.ace.repository;

import com.dxc.fsg.bps.ace.domain.PrintManagement;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PrintManagement entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrintManagementRepository extends JpaRepository<PrintManagement, Long> {

}
