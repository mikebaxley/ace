package com.dxc.fsg.bps.ace.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A BundleGroup.
 */
@Entity
@Table(name = "bundle_group")
public class BundleGroup implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "bundle_group_name")
    private String bundleGroupName;

    @Column(name = "bundle_group_key")
    private String bundleGroupKey;

    @ManyToMany
    @JoinTable(name = "bundle_group_bundle",
               joinColumns = @JoinColumn(name="bundle_groups_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="bundles_id", referencedColumnName="id"))
    private Set<Bundle> bundles = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBundleGroupName() {
        return bundleGroupName;
    }

    public BundleGroup bundleGroupName(String bundleGroupName) {
        this.bundleGroupName = bundleGroupName;
        return this;
    }

    public void setBundleGroupName(String bundleGroupName) {
        this.bundleGroupName = bundleGroupName;
    }

    public String getBundleGroupKey() {
        return bundleGroupKey;
    }

    public BundleGroup bundleGroupKey(String bundleGroupKey) {
        this.bundleGroupKey = bundleGroupKey;
        return this;
    }

    public void setBundleGroupKey(String bundleGroupKey) {
        this.bundleGroupKey = bundleGroupKey;
    }

    public Set<Bundle> getBundles() {
        return bundles;
    }

    public BundleGroup bundles(Set<Bundle> bundles) {
        this.bundles = bundles;
        return this;
    }

    public BundleGroup addBundle(Bundle bundle) {
        this.bundles.add(bundle);
        bundle.getBundleGroups().add(this);
        return this;
    }

    public BundleGroup removeBundle(Bundle bundle) {
        this.bundles.remove(bundle);
        bundle.getBundleGroups().remove(this);
        return this;
    }

    public void setBundles(Set<Bundle> bundles) {
        this.bundles = bundles;
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
        BundleGroup bundleGroup = (BundleGroup) o;
        if (bundleGroup.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bundleGroup.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BundleGroup{" +
            "id=" + getId() +
            ", bundleGroupName='" + getBundleGroupName() + "'" +
            ", bundleGroupKey='" + getBundleGroupKey() + "'" +
            "}";
    }
}
