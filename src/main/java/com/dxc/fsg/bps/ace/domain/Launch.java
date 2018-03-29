package com.dxc.fsg.bps.ace.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Launch.
 */
@Entity
@Table(name = "launch")
public class Launch implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "launch_app")
    private String launchApp;

    @Column(name = "launch_key")
    private String launchKey;

    @Column(name = "enabled")
    private Boolean enabled;

    @ManyToOne
    private BundleGroup bundleGroup;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLaunchApp() {
        return launchApp;
    }

    public Launch launchApp(String launchApp) {
        this.launchApp = launchApp;
        return this;
    }

    public void setLaunchApp(String launchApp) {
        this.launchApp = launchApp;
    }

    public String getLaunchKey() {
        return launchKey;
    }

    public Launch launchKey(String launchKey) {
        this.launchKey = launchKey;
        return this;
    }

    public void setLaunchKey(String launchKey) {
        this.launchKey = launchKey;
    }

    public Boolean isEnabled() {
        return enabled;
    }

    public Launch enabled(Boolean enabled) {
        this.enabled = enabled;
        return this;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public BundleGroup getBundleGroup() {
        return bundleGroup;
    }

    public Launch bundleGroup(BundleGroup bundleGroup) {
        this.bundleGroup = bundleGroup;
        return this;
    }

    public void setBundleGroup(BundleGroup bundleGroup) {
        this.bundleGroup = bundleGroup;
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
        Launch launch = (Launch) o;
        if (launch.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), launch.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Launch{" +
            "id=" + getId() +
            ", launchApp='" + getLaunchApp() + "'" +
            ", launchKey='" + getLaunchKey() + "'" +
            ", enabled='" + isEnabled() + "'" +
            "}";
    }
}
