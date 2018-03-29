package com.dxc.fsg.bps.ace.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A PrintManagement.
 */
@Entity
@Table(name = "print_management")
public class PrintManagement implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "printer_name")
    private String printerName;

    @Column(name = "when_document_created")
    private Instant whenDocumentCreated;

    @Column(name = "from_server")
    private String fromServer;

    @Column(name = "document_file_name")
    private String documentFileName;

    @Column(name = "document_full_path")
    private String documentFullPath;

    @Column(name = "document_status")
    private String documentStatus;

    @Column(name = "try_count")
    private Integer tryCount;

    @Column(name = "when_processed")
    private Instant whenProcessed;

    @Column(name = "processing_duration")
    private Integer processingDuration;

    @Column(name = "processing_info")
    private String processingInfo;

    @Column(name = "extra_field")
    private String extraField;

    @OneToOne
    @JoinColumn(unique = true)
    private WebServiceRequestAudit fromRequest;

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

    public PrintManagement printerName(String printerName) {
        this.printerName = printerName;
        return this;
    }

    public void setPrinterName(String printerName) {
        this.printerName = printerName;
    }

    public Instant getWhenDocumentCreated() {
        return whenDocumentCreated;
    }

    public PrintManagement whenDocumentCreated(Instant whenDocumentCreated) {
        this.whenDocumentCreated = whenDocumentCreated;
        return this;
    }

    public void setWhenDocumentCreated(Instant whenDocumentCreated) {
        this.whenDocumentCreated = whenDocumentCreated;
    }

    public String getFromServer() {
        return fromServer;
    }

    public PrintManagement fromServer(String fromServer) {
        this.fromServer = fromServer;
        return this;
    }

    public void setFromServer(String fromServer) {
        this.fromServer = fromServer;
    }

    public String getDocumentFileName() {
        return documentFileName;
    }

    public PrintManagement documentFileName(String documentFileName) {
        this.documentFileName = documentFileName;
        return this;
    }

    public void setDocumentFileName(String documentFileName) {
        this.documentFileName = documentFileName;
    }

    public String getDocumentFullPath() {
        return documentFullPath;
    }

    public PrintManagement documentFullPath(String documentFullPath) {
        this.documentFullPath = documentFullPath;
        return this;
    }

    public void setDocumentFullPath(String documentFullPath) {
        this.documentFullPath = documentFullPath;
    }

    public String getDocumentStatus() {
        return documentStatus;
    }

    public PrintManagement documentStatus(String documentStatus) {
        this.documentStatus = documentStatus;
        return this;
    }

    public void setDocumentStatus(String documentStatus) {
        this.documentStatus = documentStatus;
    }

    public Integer getTryCount() {
        return tryCount;
    }

    public PrintManagement tryCount(Integer tryCount) {
        this.tryCount = tryCount;
        return this;
    }

    public void setTryCount(Integer tryCount) {
        this.tryCount = tryCount;
    }

    public Instant getWhenProcessed() {
        return whenProcessed;
    }

    public PrintManagement whenProcessed(Instant whenProcessed) {
        this.whenProcessed = whenProcessed;
        return this;
    }

    public void setWhenProcessed(Instant whenProcessed) {
        this.whenProcessed = whenProcessed;
    }

    public Integer getProcessingDuration() {
        return processingDuration;
    }

    public PrintManagement processingDuration(Integer processingDuration) {
        this.processingDuration = processingDuration;
        return this;
    }

    public void setProcessingDuration(Integer processingDuration) {
        this.processingDuration = processingDuration;
    }

    public String getProcessingInfo() {
        return processingInfo;
    }

    public PrintManagement processingInfo(String processingInfo) {
        this.processingInfo = processingInfo;
        return this;
    }

    public void setProcessingInfo(String processingInfo) {
        this.processingInfo = processingInfo;
    }

    public String getExtraField() {
        return extraField;
    }

    public PrintManagement extraField(String extraField) {
        this.extraField = extraField;
        return this;
    }

    public void setExtraField(String extraField) {
        this.extraField = extraField;
    }

    public WebServiceRequestAudit getFromRequest() {
        return fromRequest;
    }

    public PrintManagement fromRequest(WebServiceRequestAudit webServiceRequestAudit) {
        this.fromRequest = webServiceRequestAudit;
        return this;
    }

    public void setFromRequest(WebServiceRequestAudit webServiceRequestAudit) {
        this.fromRequest = webServiceRequestAudit;
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
        PrintManagement printManagement = (PrintManagement) o;
        if (printManagement.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), printManagement.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PrintManagement{" +
            "id=" + getId() +
            ", printerName='" + getPrinterName() + "'" +
            ", whenDocumentCreated='" + getWhenDocumentCreated() + "'" +
            ", fromServer='" + getFromServer() + "'" +
            ", documentFileName='" + getDocumentFileName() + "'" +
            ", documentFullPath='" + getDocumentFullPath() + "'" +
            ", documentStatus='" + getDocumentStatus() + "'" +
            ", tryCount=" + getTryCount() +
            ", whenProcessed='" + getWhenProcessed() + "'" +
            ", processingDuration=" + getProcessingDuration() +
            ", processingInfo='" + getProcessingInfo() + "'" +
            ", extraField='" + getExtraField() + "'" +
            "}";
    }
}
