package com.dxc.fsg.bps.ace.repository;

import com.dxc.fsg.bps.ace.domain.TemplateParameters;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TemplateParameters entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TemplateParametersRepository extends JpaRepository<TemplateParameters, Long> {

}
