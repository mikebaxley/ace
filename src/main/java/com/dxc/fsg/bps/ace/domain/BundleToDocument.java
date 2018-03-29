package com.dxc.fsg.bps.ace.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A BundleToDocument.
 */
@Entity
@Table(name = "bundle_to_document")
public class BundleToDocument implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "collate_sequence")
    private Integer collateSequence;

    @Column(name = "optional")
    private Boolean optional;

    @ManyToOne
    private Bundle bundle;

    @ManyToOne
    private DocumentGeneric document;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCollateSequence() {
        return collateSequence;
    }

    public BundleToDocument collateSequence(Integer collateSequence) {
        this.collateSequence = collateSequence;
        return this;
    }

    public void setCollateSequence(Integer collateSequence) {
        this.collateSequence = collateSequence;
    }

    public Boolean isOptional() {
        return optional;
    }

    public BundleToDocument optional(Boolean optional) {
        this.optional = optional;
        return this;
    }

    public void setOptional(Boolean optional) {
        this.optional = optional;
    }

    public Bundle getBundle() {
        return bundle;
    }

    public BundleToDocument bundle(Bundle bundle) {
        this.bundle = bundle;
        return this;
    }

    public void setBundle(Bundle bundle) {
        this.bundle = bundle;
    }

    public DocumentGeneric getDocument() {
        return document;
    }

    public BundleToDocument document(DocumentGeneric documentGeneric) {
        this.document = documentGeneric;
        return this;
    }

    public void setDocument(DocumentGeneric documentGeneric) {
        this.document = documentGeneric;
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
        BundleToDocument bundleToDocument = (BundleToDocument) o;
        if (bundleToDocument.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bundleToDocument.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BundleToDocument{" +
            "id=" + getId() +
            ", collateSequence=" + getCollateSequence() +
            ", optional='" + isOptional() + "'" +
            "}";
    }
}
