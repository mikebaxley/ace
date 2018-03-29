package com.dxc.fsg.bps.ace.repository;

import com.dxc.fsg.bps.ace.domain.DocumentSpecific;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the DocumentSpecific entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentSpecificRepository extends JpaRepository<DocumentSpecific, Long> {
    @Query("select distinct document_specific from DocumentSpecific document_specific left join fetch document_specific.documentStates")
    List<DocumentSpecific> findAllWithEagerRelationships();

    @Query("select document_specific from DocumentSpecific document_specific left join fetch document_specific.documentStates where document_specific.id =:id")
    DocumentSpecific findOneWithEagerRelationships(@Param("id") Long id);

}
