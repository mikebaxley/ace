package com.dxc.fsg.bps.ace.repository;

import com.dxc.fsg.bps.ace.domain.Launch;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Launch entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LaunchRepository extends JpaRepository<Launch, Long> {

}
