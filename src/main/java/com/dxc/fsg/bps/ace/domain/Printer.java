package com.dxc.fsg.bps.ace.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Printer.
 */
@Entity
@Table(name = "printer")
public class Printer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "printer_name")
    private String printerName;

    @Column(name = "printer_description")
    private String printerDescription;

    @Column(name = "managed")
    private Boolean managed;

    @ManyToOne
    private AceCompany aceCompany;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPrinterName() {
        return printerName;
    }

    public Printer printerName(String printerName) {
        this.printerName = printerName;
        return this;
    }

    public void setPrinterName(String printerName) {
        this.printerName = printerName;
    }

    public String getPrinterDescription() {
        return printerDescription;
    }

    public Printer printerDescription(String printerDescription) {
        this.printerDescription = printerDescription;
        return this;
    }

    public void setPrinterDescription(String printerDescription) {
        this.printerDescription = printerDescription;
    }

    public Boolean isManaged() {
        return managed;
    }

    public Printer managed(Boolean managed) {
        this.managed = managed;
        return this;
    }

    public void setManaged(Boolean managed) {
        this.managed = managed;
    }

    public AceCompany getAceCompany() {
        return aceCompany;
    }

    public Printer aceCompany(AceCompany aceCompany) {
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
        Printer printer = (Printer) o;
        if (printer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), printer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Printer{" +
            "id=" + getId() +
            ", printerName='" + getPrinterName() + "'" +
            ", printerDescription='" + getPrinterDescription() + "'" +
            ", managed='" + isManaged() + "'" +
            "}";
    }
}
