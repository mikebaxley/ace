package com.dxc.fsg.bps.ace.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Bundle.
 */
@Entity
@Table(name = "bundle")
public class Bundle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "bundle_name")
    private String bundleName;

    @Column(name = "bundle_key")
    private String bundleKey;

    @Size(max = 25)
    @Column(name = "awd_source_type", length = 25)
    private String awdSourceType;

    @OneToMany(mappedBy = "bundle")
    @JsonIgnore
    private Set<BundleToDocument> bundleToDocuments = new HashSet<>();

    @ManyToMany(mappedBy = "bundles")
    @JsonIgnore
    private Set<BundleGroup> bundleGroups = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBundleName() {
        return bundleName;
    }

    public Bundle bundleName(String bundleName) {
        this.bundleName = bundleName;
        return this;
    }

    public void setBundleName(String bundleName) {
        this.bundleName = bundleName;
    }

    public String getBundleKey() {
        return bundleKey;
    }

    public Bundle bundleKey(String bundleKey) {
        this.bundleKey = bundleKey;
        return this;
    }

    public void setBundleKey(String bundleKey) {
        this.bundleKey = bundleKey;
    }

    public String getAwdSourceType() {
        return awdSourceType;
    }

    public Bundle awdSourceType(String awdSourceType) {
        this.awdSourceType = awdSourceType;
        return this;
    }

    public void setAwdSourceType(String awdSourceType) {
        this.awdSourceType = awdSourceType;
    }

    public Set<BundleToDocument> getBundleToDocuments() {
        return bundleToDocuments;
    }

    public Bundle bundleToDocuments(Set<BundleToDocument> bundleToDocuments) {
        this.bundleToDocuments = bundleToDocuments;
        return this;
    }

    public Bundle addBundleToDocument(BundleToDocument bundleToDocument) {
        this.bundleToDocuments.add(bundleToDocument);
        bundleToDocument.setBundle(this);
        return this;
    }

    public Bundle removeBundleToDocument(BundleToDocument bundleToDocument) {
        this.bundleToDocuments.remove(bundleToDocument);
        bundleToDocument.setBundle(null);
        return this;
    }

    public void setBundleToDocuments(Set<BundleToDocument> bundleToDocuments) {
        this.bundleToDocuments = bundleToDocuments;
    }

    public Set<BundleGroup> getBundleGroups() {
        return bundleGroups;
    }

    public Bundle bundleGroups(Set<BundleGroup> bundleGroups) {
        this.bundleGroups = bundleGroups;
        return this;
    }

    public Bundle addBundleGroup(BundleGroup bundleGroup) {
        this.bundleGroups.add(bundleGroup);
        bundleGroup.getBundles().add(this);
        return this;
    }

    public Bundle removeBundleGroup(BundleGroup bundleGroup) {
        this.bundleGroups.remove(bundleGroup);
        bundleGroup.getBundles().remove(this);
        return this;
    }

    public void setBundleGroups(Set<BundleGroup> bundleGroups) {
        this.bundleGroups = bundleGroups;
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
        Bundle bundle = (Bundle) o;
        if (bundle.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bundle.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Bundle{" +
            "id=" + getId() +
            ", bundleName='" + getBundleName() + "'" +
            ", bundleKey='" + getBundleKey() + "'" +
            ", awdSourceType='" + getAwdSourceType() + "'" +
            "}";
    }
}
