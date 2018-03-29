package com.dxc.fsg.bps.ace.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DocumentSpecific.
 */
@Entity
@Table(name = "document_specific")
public class DocumentSpecific implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "file_path")
    private String filePath;

    @OneToMany(mappedBy = "document")
    @JsonIgnore
    private Set<TemplateParameters> templateParameters = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "document_specific_document_state",
               joinColumns = @JoinColumn(name="document_specifics_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="document_states_id", referencedColumnName="id"))
    private Set<DocumentState> documentStates = new HashSet<>();

    @ManyToOne
    private DocumentGeneric document;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public DocumentSpecific fileName(String fileName) {
        this.fileName = fileName;
        return this;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFilePath() {
        return filePath;
    }

    public DocumentSpecific filePath(String filePath) {
        this.filePath = filePath;
        return this;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public Set<TemplateParameters> getTemplateParameters() {
        return templateParameters;
    }

    public DocumentSpecific templateParameters(Set<TemplateParameters> templateParameters) {
        this.templateParameters = templateParameters;
        return this;
    }

    public DocumentSpecific addTemplateParameters(TemplateParameters templateParameters) {
        this.templateParameters.add(templateParameters);
        templateParameters.setDocument(this);
        return this;
    }

    public DocumentSpecific removeTemplateParameters(TemplateParameters templateParameters) {
        this.templateParameters.remove(templateParameters);
        templateParameters.setDocument(null);
        return this;
    }

    public void setTemplateParameters(Set<TemplateParameters> templateParameters) {
        this.templateParameters = templateParameters;
    }

    public Set<DocumentState> getDocumentStates() {
        return documentStates;
    }

    public DocumentSpecific documentStates(Set<DocumentState> documentStates) {
        this.documentStates = documentStates;
        return this;
    }

    public DocumentSpecific addDocumentState(DocumentState documentState) {
        this.documentStates.add(documentState);
        documentState.getDocuments().add(this);
        return this;
    }

    public DocumentSpecific removeDocumentState(DocumentState documentState) {
        this.documentStates.remove(documentState);
        documentState.getDocuments().remove(this);
        return this;
    }

    public void setDocumentStates(Set<DocumentState> documentStates) {
        this.documentStates = documentStates;
    }

    public DocumentGeneric getDocument() {
        return document;
    }

    public DocumentSpecific document(DocumentGeneric documentGeneric) {
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
        DocumentSpecific documentSpecific = (DocumentSpecific) o;
        if (documentSpecific.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), documentSpecific.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DocumentSpecific{" +
            "id=" + getId() +
            ", fileName='" + getFileName() + "'" +
            ", filePath='" + getFilePath() + "'" +
            "}";
    }
}
