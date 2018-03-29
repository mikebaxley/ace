package com.dxc.fsg.bps.ace.repository;

import com.dxc.fsg.bps.ace.domain.BundleGroup;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the BundleGroup entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BundleGroupRepository extends JpaRepository<BundleGroup, Long> {
    @Query("select distinct bundle_group from BundleGroup bundle_group left join fetch bundle_group.bundles")
    List<BundleGroup> findAllWithEagerRelationships();

    @Query("select bundle_group from BundleGroup bundle_group left join fetch bundle_group.bundles where bundle_group.id =:id")
    BundleGroup findOneWithEagerRelationships(@Param("id") Long id);

}
