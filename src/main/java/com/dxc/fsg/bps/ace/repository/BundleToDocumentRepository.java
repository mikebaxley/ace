package com.dxc.fsg.bps.ace.repository;

import com.dxc.fsg.bps.ace.domain.BundleToDocument;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the BundleToDocument entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BundleToDocumentRepository extends JpaRepository<BundleToDocument, Long> {

}
