package com.informationsystem.library.model;

import java.util.Map;
import static java.util.Map.entry;

public class Status {

    public static final Map<StatusName, Short> STATUSES = Map.ofEntries(
            entry(StatusName.IN_STOCK, (short)1),
            entry(StatusName.CHECKED_OUT, (short)2),
            entry(StatusName.TAKEN_OUT, (short)3),
            entry(StatusName.LOST, (short)4)
    );

}
