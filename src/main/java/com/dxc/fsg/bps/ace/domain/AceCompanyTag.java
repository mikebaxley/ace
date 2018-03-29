package com.dxc.fsg.bps.ace.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A AceCompanyTag.
 */
@Entity
@Table(name = "ace_company_tag")
public class AceCompanyTag implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "company_tag")
    private String companyTag;

    @Column(name = "company_tag_value")
    private String companyTagValue;

    @ManyToOne
    private AceCompany aceCompany;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyTag() {
        return companyTag;
    }

    public AceCompanyTag companyTag(String companyTag) {
        this.companyTag = companyTag;
        return this;
    }

    public void setCompanyTag(String companyTag) {
        this.companyTag = companyTag;
    }

    public String getCompanyTagValue() {
        return companyTagValue;
    }

    public AceCompanyTag companyTagValue(String companyTagValue) {
        this.companyTagValue = companyTagValue;
        return this;
    }

    public void setCompanyTagValue(String companyTagValue) {
        this.companyTagValue = companyTagValue;
    }

    public AceCompany getAceCompany() {
        return aceCompany;
    }

    public AceCompanyTag aceCompany(AceCompany aceCompany) {
        this.aceCompany = aceCompany;
        return this;
    }

    public void setAceCompany(AceCompany aceCompany) {
        this.aceCompany = aceCompany;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AceCompanyTag aceCompanyTag = (AceCompanyTag) o;
        if (aceCompanyTag.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), aceCompanyTag.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AceCompanyTag{" +
            "id=" + getId() +
            ", companyTag='" + getCompanyTag() + "'" +
            ", companyTagValue='" + getCompanyTagValue() + "'" +
            "}";
    }
}
