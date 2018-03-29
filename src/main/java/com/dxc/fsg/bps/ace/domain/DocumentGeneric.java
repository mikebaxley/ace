package com.dxc.fsg.bps.ace.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DocumentGeneric.
 */
@Entity
@Table(name = "document_generic")
public class DocumentGeneric implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "generic_key")
    private String genericKey;

    @Column(name = "match_issue_or_resident_state")
    private String matchIssueOrResidentState;

    @ManyToOne
    private DocumentType documentType;

    @ManyToMany
    @JoinTable(name = "document_generic_ace_company",
               joinColumns = @JoinColumn(name="document_generics_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="ace_companies_id", referencedColumnName="id"))
    private Set<AceCompany> aceCompanies = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGenericKey() {
        return genericKey;
    }

    public DocumentGeneric genericKey(String genericKey) {
        this.genericKey = genericKey;
        return this;
    }

    public void setGenericKey(String genericKey) {
        this.genericKey = genericKey;
    }

    public String getMatchIssueOrResidentState() {
        return matchIssueOrResidentState;
    }

    public DocumentGeneric matchIssueOrResidentState(String matchIssueOrResidentState) {
        this.matchIssueOrResidentState = matchIssueOrResidentState;
        return this;
    }

    public void setMatchIssueOrResidentState(String matchIssueOrResidentState) {
        this.matchIssueOrResidentState = matchIssueOrResidentState;
    }

    public DocumentType getDocumentType() {
        return documentType;
    }

    public DocumentGeneric documentType(DocumentType documentType) {
        this.documentType = documentType;
        return this;
    }

    public void setDocumentType(DocumentType documentType) {
        this.documentType = documentType;
    }

    public Set<AceCompany> getAceCompanies() {
        return aceCompanies;
    }

    public DocumentGeneric aceCompanies(Set<AceCompany> aceCompanies) {
        this.aceCompanies = aceCompanies;
        return this;
    }

    public DocumentGeneric addAceCompany(AceCompany aceCompany) {
        this.aceCompanies.add(aceCompany);
        aceCompany.getDocuments().add(this);
        return this;
    }

    public DocumentGeneric removeAceCompany(AceCompany aceCompany) {
        this.aceCompanies.remove(aceCompany);
        aceCompany.getDocuments().remove(this);
        return this;
    }

    public void setAceCompanies(Set<AceCompany> aceCompanies) {
        this.aceCompanies = aceCompanies;
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
        DocumentGeneric documentGeneric = (DocumentGeneric) o;
        if (documentGeneric.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), documentGeneric.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DocumentGeneric{" +
            "id=" + getId() +
            ", genericKey='" + getGenericKey() + "'" +
            ", matchIssueOrResidentState='" + getMatchIssueOrResidentState() + "'" +
            "}";
    }
}
