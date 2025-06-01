package com.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object (DTO) representing essential user information.
 *
 * <p>This class is typically used to encapsulate a subset of user data
 * that needs to be shared externally, such as via API responses.
 * It is not tied to any database entity directly and is safe to expose
 * to clients.</p>
 *
 * <p><b>Used as part of composition in response objects like {@link com.chat.dto.LoginResponse}</b>
 * to cleanly separate user metadata from authentication tokens and timestamps.</p>
 *
 * <p>Example use case:</p>
 * <pre>
 *     new LoginResponse(new UserDTO(...), issuedAt, expiresAt);
 * </pre>
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private int id;
    private String username;
    private String gender;
    private String email;
}
