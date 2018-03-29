package com.dxc.fsg.bps.ace.repository;

import com.dxc.fsg.bps.ace.domain.DocumentGeneric;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the DocumentGeneric entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentGenericRepository extends JpaRepository<DocumentGeneric, Long> {
    @Query("select distinct document_generic from DocumentGeneric document_generic left join fetch document_generic.aceCompanies")
    List<DocumentGeneric> findAllWithEagerRelationships();

    @Query("select document_generic from DocumentGeneric document_generic left join fetch document_generic.aceCompanies where document_generic.id =:id")
    DocumentGeneric findOneWithEagerRelationships(@Param("id") Long id);

}
