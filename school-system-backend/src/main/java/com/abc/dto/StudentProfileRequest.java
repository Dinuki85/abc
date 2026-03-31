package com.abc.dto;

public class StudentProfileRequest {
    private String address;
    private String parentName;
    private String parentContact;

    public StudentProfileRequest() {}

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getParentName() { return parentName; }
    public void setParentName(String parentName) { this.parentName = parentName; }

    public String getParentContact() { return parentContact; }
    public void setParentContact(String parentContact) { this.parentContact = parentContact; }
}
