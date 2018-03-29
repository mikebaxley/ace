package com.dxc.fsg.bps.ace.repository;

import com.dxc.fsg.bps.ace.domain.Bundle;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Bundle entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BundleRepository extends JpaRepository<Bundle, Long> {

}
