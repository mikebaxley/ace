package com.dxc.fsg.bps.ace.repository;

import com.dxc.fsg.bps.ace.domain.DocumentState;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the DocumentState entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentStateRepository extends JpaRepository<DocumentState, Long> {

}
