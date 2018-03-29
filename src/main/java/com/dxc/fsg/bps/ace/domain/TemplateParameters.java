package com.dxc.fsg.bps.ace.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A TemplateParameters.
 */
@Entity
@Table(name = "template_parameters")
public class TemplateParameters implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "parameter_name")
    private String parameterName;

    @Column(name = "value_formula")
    private String valueFormula;

    @Column(name = "required")
    private Boolean required;

    @Column(name = "ui_fragment_key")
    private String uiFragmentKey;

    @ManyToOne
    private DocumentSpecific document;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getParameterName() {
        return parameterName;
    }

    public TemplateParameters parameterName(String parameterName) {
        this.parameterName = parameterName;
        return this;
    }

    public void setParameterName(String parameterName) {
        this.parameterName = parameterName;
    }

    public String getValueFormula() {
        return valueFormula;
    }

    public TemplateParameters valueFormula(String valueFormula) {
        this.valueFormula = valueFormula;
        return this;
    }

    public void setValueFormula(String valueFormula) {
        this.valueFormula = valueFormula;
    }

    public Boolean isRequired() {
        return required;
    }

    public TemplateParameters required(Boolean required) {
        this.required = required;
        return this;
    }

    public void setRequired(Boolean required) {
        this.required = required;
    }

    public String getUiFragmentKey() {
        return uiFragmentKey;
    }

    public TemplateParameters uiFragmentKey(String uiFragmentKey) {
        this.uiFragmentKey = uiFragmentKey;
        return this;
    }

    public void setUiFragmentKey(String uiFragmentKey) {
        this.uiFragmentKey = uiFragmentKey;
    }

    public DocumentSpecific getDocument() {
        return document;
    }

    public TemplateParameters document(DocumentSpecific documentSpecific) {
        this.document = documentSpecific;
        return this;
    }

    public void setDocument(DocumentSpecific documentSpecific) {
        this.document = documentSpecific;
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
        TemplateParameters templateParameters = (TemplateParameters) o;
        if (templateParameters.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), templateParameters.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TemplateParameters{" +
            "id=" + getId() +
            ", parameterName='" + getParameterName() + "'" +
            ", valueFormula='" + getValueFormula() + "'" +
            ", required='" + isRequired() + "'" +
            ", uiFragmentKey='" + getUiFragmentKey() + "'" +
            "}";
    }
}
