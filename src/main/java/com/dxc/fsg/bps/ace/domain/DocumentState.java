package com.dxc.fsg.bps.ace.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DocumentState.
 */
@Entity
@Table(name = "document_state")
public class DocumentState implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 2)
    @Column(name = "state", length = 2, nullable = false)
    private String state;

    @ManyToMany(mappedBy = "documentStates")
    @JsonIgnore
    private Set<DocumentSpecific> documents = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getState() {
        return state;
    }

    public DocumentState state(String state) {
        this.state = state;
        return this;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Set<DocumentSpecific> getDocuments() {
        return documents;
    }

    public DocumentState documents(Set<DocumentSpecific> documentSpecifics) {
        this.documents = documentSpecifics;
        return this;
    }

    public DocumentState addDocument(DocumentSpecific documentSpecific) {
        this.documents.add(documentSpecific);
        documentSpecific.getDocumentStates().add(this);
        return this;
    }

    public DocumentState removeDocument(DocumentSpecific documentSpecific) {
        this.documents.remove(documentSpecific);
        documentSpecific.getDocumentStates().remove(this);
        return this;
    }

    public void setDocuments(Set<DocumentSpecific> documentSpecifics) {
        this.documents = documentSpecifics;
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
        DocumentState documentState = (DocumentState) o;
        if (documentState.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), documentState.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DocumentState{" +
            "id=" + getId() +
            ", state='" + getState() + "'" +
            "}";
    }
}
