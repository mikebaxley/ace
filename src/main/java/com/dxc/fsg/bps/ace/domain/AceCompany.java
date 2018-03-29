package com.dxc.fsg.bps.ace.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A AceCompany.
 */
@Entity
@Table(name = "ace_company")
public class AceCompany implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 4)
    @Column(name = "region_code", length = 4)
    private String regionCode;

    @Size(max = 6)
    @Column(name = "company_code", length = 6)
    private String companyCode;

    @Column(name = "canadian")
    private Boolean canadian;

    @Column(name = "letterhead")
    private String letterhead;

    @Column(name = "reinstatement_canadian")
    private Boolean reinstatementCanadian;

    @Column(name = "url")
    private String url;

    @Column(name = "variable_products")
    private Boolean variableProducts;

    @Column(name = "admin_system")
    private String adminSystem;

    @Column(name = "web_site")
    private String webSite;

    @Column(name = "stat_co_code")
    private String statCoCode;

    @Column(name = "web_word")
    private String webWord;

    @Column(name = "opt_param")
    private String optParam;

    @Column(name = "logo")
    private String logo;

    @OneToMany(mappedBy = "aceCompany")
    @JsonIgnore
    private Set<AceCompanyTag> aceCompanyTags = new HashSet<>();

    @OneToMany(mappedBy = "aceCompany")
    @JsonIgnore
    private Set<Printer> printers = new HashSet<>();

    @ManyToMany(mappedBy = "aceCompanies")
    @JsonIgnore
    private Set<DocumentGeneric> documents = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRegionCode() {
        return regionCode;
    }

    public AceCompany regionCode(String regionCode) {
        this.regionCode = regionCode;
        return this;
    }

    public void setRegionCode(String regionCode) {
        this.regionCode = regionCode;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public AceCompany companyCode(String companyCode) {
        this.companyCode = companyCode;
        return this;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public Boolean isCanadian() {
        return canadian;
    }

    public AceCompany canadian(Boolean canadian) {
        this.canadian = canadian;
        return this;
    }

    public void setCanadian(Boolean canadian) {
        this.canadian = canadian;
    }

    public String getLetterhead() {
        return letterhead;
    }

    public AceCompany letterhead(String letterhead) {
        this.letterhead = letterhead;
        return this;
    }

    public void setLetterhead(String letterhead) {
        this.letterhead = letterhead;
    }

    public Boolean isReinstatementCanadian() {
        return reinstatementCanadian;
    }

    public AceCompany reinstatementCanadian(Boolean reinstatementCanadian) {
        this.reinstatementCanadian = reinstatementCanadian;
        return this;
    }

    public void setReinstatementCanadian(Boolean reinstatementCanadian) {
        this.reinstatementCanadian = reinstatementCanadian;
    }

    public String getUrl() {
        return url;
    }

    public AceCompany url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Boolean isVariableProducts() {
        return variableProducts;
    }

    public AceCompany variableProducts(Boolean variableProducts) {
        this.variableProducts = variableProducts;
        return this;
    }

    public void setVariableProducts(Boolean variableProducts) {
        this.variableProducts = variableProducts;
    }

    public String getAdminSystem() {
        return adminSystem;
    }

    public AceCompany adminSystem(String adminSystem) {
        this.adminSystem = adminSystem;
        return this;
    }

    public void setAdminSystem(String adminSystem) {
        this.adminSystem = adminSystem;
    }

    public String getWebSite() {
        return webSite;
    }

    public AceCompany webSite(String webSite) {
        this.webSite = webSite;
        return this;
    }

    public void setWebSite(String webSite) {
        this.webSite = webSite;
    }

    public String getStatCoCode() {
        return statCoCode;
    }

    public AceCompany statCoCode(String statCoCode) {
        this.statCoCode = statCoCode;
        return this;
    }

    public void setStatCoCode(String statCoCode) {
        this.statCoCode = statCoCode;
    }

    public String getWebWord() {
        return webWord;
    }

    public AceCompany webWord(String webWord) {
        this.webWord = webWord;
        return this;
    }

    public void setWebWord(String webWord) {
        this.webWord = webWord;
    }

    public String getOptParam() {
        return optParam;
    }

    public AceCompany optParam(String optParam) {
        this.optParam = optParam;
        return this;
    }

    public void setOptParam(String optParam) {
        this.optParam = optParam;
    }

    public String getLogo() {
        return logo;
    }

    public AceCompany logo(String logo) {
        this.logo = logo;
        return this;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public Set<AceCompanyTag> getAceCompanyTags() {
        return aceCompanyTags;
    }

    public AceCompany aceCompanyTags(Set<AceCompanyTag> aceCompanyTags) {
        this.aceCompanyTags = aceCompanyTags;
        return this;
    }

    public AceCompany addAceCompanyTag(AceCompanyTag aceCompanyTag) {
        this.aceCompanyTags.add(aceCompanyTag);
        aceCompanyTag.setAceCompany(this);
        return this;
    }

    public AceCompany removeAceCompanyTag(AceCompanyTag aceCompanyTag) {
        this.aceCompanyTags.remove(aceCompanyTag);
        aceCompanyTag.setAceCompany(null);
        return this;
    }

    public void setAceCompanyTags(Set<AceCompanyTag> aceCompanyTags) {
        this.aceCompanyTags = aceCompanyTags;
    }

    public Set<Printer> getPrinters() {
        return printers;
    }

    public AceCompany printers(Set<Printer> printers) {
        this.printers = printers;
        return this;
    }

    public AceCompany addPrinter(Printer printer) {
        this.printers.add(printer);
        printer.setAceCompany(this);
        return this;
    }

    public AceCompany removePrinter(Printer printer) {
        this.printers.remove(printer);
        printer.setAceCompany(null);
        return this;
    }

    public void setPrinters(Set<Printer> printers) {
        this.printers = printers;
    }

    public Set<DocumentGeneric> getDocuments() {
        return documents;
    }

    public AceCompany documents(Set<DocumentGeneric> documentGenerics) {
        this.documents = documentGenerics;
        return this;
    }

    public AceCompany addDocument(DocumentGeneric documentGeneric) {
        this.documents.add(documentGeneric);
        documentGeneric.getAceCompanies().add(this);
        return this;
    }

    public AceCompany removeDocument(DocumentGeneric documentGeneric) {
        this.documents.remove(documentGeneric);
        documentGeneric.getAceCompanies().remove(this);
        return this;
    }

    public void setDocuments(Set<DocumentGeneric> documentGenerics) {
        this.documents = documentGenerics;
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
        AceCompany aceCompany = (AceCompany) o;
        if (aceCompany.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), aceCompany.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AceCompany{" +
            "id=" + getId() +
            ", regionCode='" + getRegionCode() + "'" +
            ", companyCode='" + getCompanyCode() + "'" +
            ", canadian='" + isCanadian() + "'" +
            ", letterhead='" + getLetterhead() + "'" +
            ", reinstatementCanadian='" + isReinstatementCanadian() + "'" +
            ", url='" + getUrl() + "'" +
            ", variableProducts='" + isVariableProducts() + "'" +
            ", adminSystem='" + getAdminSystem() + "'" +
            ", webSite='" + getWebSite() + "'" +
            ", statCoCode='" + getStatCoCode() + "'" +
            ", webWord='" + getWebWord() + "'" +
            ", optParam='" + getOptParam() + "'" +
            ", logo='" + getLogo() + "'" +
            "}";
    }
}
