package com.dxc.fsg.bps.ace.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DocumentType.
 */
@Entity
@Table(name = "document_type")
public class DocumentType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "document_type_name")
    private String documentTypeName;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDocumentTypeName() {
        return documentTypeName;
    }

    public DocumentType documentTypeName(String documentTypeName) {
        this.documentTypeName = documentTypeName;
        return this;
    }

    public void setDocumentTypeName(String documentTypeName) {
        this.documentTypeName = documentTypeName;
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
        DocumentType documentType = (DocumentType) o;
        if (documentType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), documentType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DocumentType{" +
            "id=" + getId() +
            ", documentTypeName='" + getDocumentTypeName() + "'" +
            "}";
    }
}
