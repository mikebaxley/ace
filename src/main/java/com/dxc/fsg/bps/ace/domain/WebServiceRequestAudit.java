package com.dxc.fsg.bps.ace.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A WebServiceRequestAudit.
 */
@Entity
@Table(name = "web_service_request_audit")
public class WebServiceRequestAudit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "request_when")
    private Instant requestWhen;

    @Column(name = "operation")
    private String operation;

    @Column(name = "duration_ms")
    private Integer durationMs;

    @Column(name = "exception")
    private String exception;

    @Column(name = "ws_request")
    private String wsRequest;

    @Column(name = "ws_response")
    private String wsResponse;

    @Column(name = "calling_app")
    private String callingApp;

    @Column(name = "from_server")
    private String fromServer;

    @Column(name = "extra_field")
    private String extraField;

    @OneToOne(mappedBy = "fromRequest")
    @JsonIgnore
    private PrintManagement printManagement;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getRequestWhen() {
        return requestWhen;
    }

    public WebServiceRequestAudit requestWhen(Instant requestWhen) {
        this.requestWhen = requestWhen;
        return this;
    }

    public void setRequestWhen(Instant requestWhen) {
        this.requestWhen = requestWhen;
    }

    public String getOperation() {
        return operation;
    }

    public WebServiceRequestAudit operation(String operation) {
        this.operation = operation;
        return this;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    public Integer getDurationMs() {
        return durationMs;
    }

    public WebServiceRequestAudit durationMs(Integer durationMs) {
        this.durationMs = durationMs;
        return this;
    }

    public void setDurationMs(Integer durationMs) {
        this.durationMs = durationMs;
    }

    public String getException() {
        return exception;
    }

    public WebServiceRequestAudit exception(String exception) {
        this.exception = exception;
        return this;
    }

    public void setException(String exception) {
        this.exception = exception;
    }

    public String getWsRequest() {
        return wsRequest;
    }

    public WebServiceRequestAudit wsRequest(String wsRequest) {
        this.wsRequest = wsRequest;
        return this;
    }

    public void setWsRequest(String wsRequest) {
        this.wsRequest = wsRequest;
    }

    public String getWsResponse() {
        return wsResponse;
    }

    public WebServiceRequestAudit wsResponse(String wsResponse) {
        this.wsResponse = wsResponse;
        return this;
    }

    public void setWsResponse(String wsResponse) {
        this.wsResponse = wsResponse;
    }

    public String getCallingApp() {
        return callingApp;
    }

    public WebServiceRequestAudit callingApp(String callingApp) {
        this.callingApp = callingApp;
        return this;
    }

    public void setCallingApp(String callingApp) {
        this.callingApp = callingApp;
    }

    public String getFromServer() {
        return fromServer;
    }

    public WebServiceRequestAudit fromServer(String fromServer) {
        this.fromServer = fromServer;
        return this;
    }

    public void setFromServer(String fromServer) {
        this.fromServer = fromServer;
    }

    public String getExtraField() {
        return extraField;
    }

    public WebServiceRequestAudit extraField(String extraField) {
        this.extraField = extraField;
        return this;
    }

    public void setExtraField(String extraField) {
        this.extraField = extraField;
    }

    public PrintManagement getPrintManagement() {
        return printManagement;
    }

    public WebServiceRequestAudit printManagement(PrintManagement printManagement) {
        this.printManagement = printManagement;
        return this;
    }

    public void setPrintManagement(PrintManagement printManagement) {
        this.printManagement = printManagement;
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
        WebServiceRequestAudit webServiceRequestAudit = (WebServiceRequestAudit) o;
        if (webServiceRequestAudit.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), webServiceRequestAudit.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "WebServiceRequestAudit{" +
            "id=" + getId() +
            ", requestWhen='" + getRequestWhen() + "'" +
            ", operation='" + getOperation() + "'" +
            ", durationMs=" + getDurationMs() +
            ", exception='" + getException() + "'" +
            ", wsRequest='" + getWsRequest() + "'" +
            ", wsResponse='" + getWsResponse() + "'" +
            ", callingApp='" + getCallingApp() + "'" +
            ", fromServer='" + getFromServer() + "'" +
            ", extraField='" + getExtraField() + "'" +
            "}";
    }
}
