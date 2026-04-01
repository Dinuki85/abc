package com.abc.dto;

import java.util.List;

public class BulkIntakeRequest {
    private List<String> indexNumbers;

    public BulkIntakeRequest() {}

    public List<String> getIndexNumbers() { return indexNumbers; }
    public void setIndexNumbers(List<String> indexNumbers) { this.indexNumbers = indexNumbers; }
}
